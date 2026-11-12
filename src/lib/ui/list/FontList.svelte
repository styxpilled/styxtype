<script lang="ts">
	import { browse, fonts, type Sort } from '#lib/browse.svelte.ts';
	import { categories, categoryLabels, type Category, type IndexEntry } from '#lib/catalog.ts';
	import Search from '#lib/ui/controls/Search.svelte';
	import Segmented from '#lib/ui/controls/Segmented.svelte';
	import { onMount } from 'svelte';
	import Chip from './Chip.svelte';

	let search = $state<HTMLInputElement>();
	let items = $state<Record<string, HTMLElement>>({});

	const present = categories.filter((c) => fonts.some((f) => f.category === c));
	const tags = [...new Set(fonts.flatMap((f) => f.tags))].sort();
	let licenses = $derived(
		[...new Set(Object.values(browse.filterData ?? {}).map((d) => d.license ?? ''))]
			.filter(Boolean)
			.sort()
	);
	let extraCount = $derived(browse.tags.length + browse.licenses.length);

	let groups = $derived.by(() => {
		if (browse.sort === 'name') return [{ label: null, fonts: browse.visible }];
		// visible is already sorted by category, so key order matches.
		const byCategory = Object.groupBy(browse.visible, (f) => f.category);
		return Object.entries(byCategory).map(([c, list]) => ({
			label: categoryLabels[c as Category],
			fonts: list as IndexEntry[]
		}));
	});

	const toggle = <T,>(list: T[], value: T) =>
		list.includes(value) ? list.filter((v) => v !== value) : [...list, value];

	function onkeydown(e: KeyboardEvent) {
		if (e.ctrlKey || e.metaKey || e.altKey) return;
		const target = e.target;
		if (target instanceof Element && target.closest('input, textarea, select, [contenteditable]')) {
			return;
		}
		if (e.key === '/') {
			e.preventDefault();
			search?.focus();
		} else if (e.key === 'ArrowDown' || e.key === 'j') {
			e.preventDefault();
			browse.step(1);
		} else if (e.key === 'ArrowUp' || e.key === 'k') {
			e.preventDefault();
			browse.step(-1);
		}
	}

	$effect(() => {
		items[browse.selected]?.scrollIntoView({ block: 'nearest' });
	});

	onMount(() => {
		// Temporary: 010 loads previews lazily.
		for (const f of fonts) {
			new FontFace(`${f.slug} subset`, `url(/fonts/${f.slug}/subset.woff2)`)
				.load()
				.then((face) => document.fonts.add(face))
				.catch(() => {});
		}
		fetch('/fonts/filters.json')
			.then((r) => r.json())
			.then((data) => (browse.filterData = data))
			.catch(() => {});
	});
</script>

<svelte:window {onkeydown} />

<div class="controls">
	<Search bind:value={browse.query} bind:input={search} label="Search fonts" placeholder="Search" />
	<div class="chips" role="group" aria-label="Category">
		{#each present as c (c)}
			<Chip
				pressed={browse.categories.includes(c)}
				onclick={() => (browse.categories = toggle(browse.categories, c))}
			>
				{categoryLabels[c]}
			</Chip>
		{/each}
		<button class="more" popovertarget="more-filters" class:active={extraCount > 0}>
			More{extraCount > 0 ? ` (${extraCount})` : ''}
		</button>
	</div>
	<div class="sort">
		<span class="label num">{browse.visible.length} of {fonts.length}</span>
		<Segmented
			label="Sort"
			bind:value={browse.sort}
			options={[
				{ value: 'name' as Sort, label: 'A-Z' },
				{ value: 'category' as Sort, label: 'Category' }
			]}
		/>
	</div>
</div>

<div id="more-filters" class="panel popover" popover>
	{#if tags.length}
		<h3 class="label">Tags</h3>
		<div class="chips">
			{#each tags as t (t)}
				<Chip
					pressed={browse.tags.includes(t)}
					onclick={() => (browse.tags = toggle(browse.tags, t))}
				>
					{t}
				</Chip>
			{/each}
		</div>
	{/if}
	<h3 class="label">License</h3>
	{#if licenses.length}
		<div class="chips">
			{#each licenses as l (l)}
				<Chip
					pressed={browse.licenses.includes(l)}
					onclick={() => (browse.licenses = toggle(browse.licenses, l))}
				>
					{l}
				</Chip>
			{/each}
		</div>
	{:else}
		<p class="label">Loading licenses</p>
	{/if}
</div>

{#if browse.visible.length === 0}
	<div class="empty">
		<p>No fonts match these filters.</p>
		<button class="clear" onclick={() => browse.clearFilters()}>Clear filters</button>
	</div>
{/if}

{#each groups as group (group.label)}
	{#if group.label}
		<h2 class="label group">{group.label}</h2>
	{/if}
	<ul>
		{#each group.fonts as f (f.slug)}
			<li bind:this={items[f.slug]}>
				<button
					class="entry"
					aria-current={f.slug === browse.selected}
					style:font-family="'{f.slug} subset', var(--font-ui)"
					title={f.name}
					onclick={() => (browse.selected = f.slug)}
				>
					{f.name}
				</button>
			</li>
		{/each}
	</ul>
{/each}

<style>
	.controls {
		position: sticky;
		top: 0;
		z-index: 1;
		display: grid;
		gap: var(--space-3);
		margin-bottom: var(--space-2);
		padding-bottom: var(--space-3);
		background: var(--surface);
		border-bottom: 1px solid var(--border);
	}

	.chips {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-1);
	}

	.more {
		anchor-name: --more-filters;
		height: 1.625rem;
		padding: 0 var(--space-2);
		border: 1px dashed var(--border-strong);
		border-radius: var(--radius-chip);
		background: none;
		font-size: var(--text-xs);
		font-weight: 500;
		color: var(--text-muted);
		cursor: pointer;

		&:hover,
		&.active {
			color: var(--accent);
			border-color: var(--accent);
		}
	}

	.popover {
		position-anchor: --more-filters;
		position-area: bottom span-right;
		position-try-fallbacks: flip-block;
		width: 15rem;
		margin: var(--space-1) 0;
		padding: var(--space-3);
		color: var(--text);

		h3:not(:first-child) {
			margin-top: var(--space-3);
		}

		h3 {
			margin-bottom: var(--space-2);
		}
	}

	.sort {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.group {
		margin: var(--space-4) 0 var(--space-1);
	}

	.entry {
		position: relative;
		display: block;
		width: 100%;
		padding: var(--space-2) var(--space-2) var(--space-2) var(--space-3);
		overflow: hidden;
		border: 0;
		border-radius: var(--radius-control);
		background: none;
		font-size: 1.375rem;
		line-height: 1.25;
		color: var(--ink);
		text-align: left;
		text-overflow: ellipsis;
		white-space: nowrap;
		cursor: pointer;

		&:hover {
			background: var(--surface-2);
		}

		&[aria-current='true']::before {
			content: '';
			position: absolute;
			left: 0;
			top: var(--space-2);
			bottom: var(--space-2);
			width: 2px;
			border-radius: var(--radius-full);
			background: var(--accent);
		}
	}

	.empty {
		display: grid;
		justify-items: start;
		gap: var(--space-2);
		padding: var(--space-4) 0;
		color: var(--text-muted);
	}

	.clear {
		padding: 0;
		border: 0;
		background: none;
		color: var(--accent);
		font-weight: 500;
		cursor: pointer;
	}
</style>
