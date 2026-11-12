<script lang="ts">
	import { browse, fonts } from '#lib/browse.svelte.ts';
	import type { FontMeta } from '#lib/catalog.ts';
	import { design } from '#lib/design.svelte.ts';
	import { fontStack, loadMeta } from '#lib/fonts.svelte.ts';
	import type { Role } from '#lib/templates/index.ts';
	import Menu from '#lib/ui/menu/Menu.svelte';
	import { menuTrigger } from '#lib/ui/menu/trigger.ts';
	import Tuning from './Tuning.svelte';

	const names = { display: 'Display', body: 'Body' };
	const nameOf = (slug: string) => fonts.find((f) => f.slug === slug)?.name ?? slug;

	let menu = $state<ReturnType<typeof Menu>>();

	let active = $derived(design.active);
	let activeSlug = $derived(design.font(active));
	let loadedMeta = $state<FontMeta>();
	let meta = $derived(loadedMeta?.slug === activeSlug ? loadedMeta : undefined);
	$effect(() => {
		loadMeta(activeSlug)
			.then((m) => (loadedMeta = m))
			.catch(() => {});
	});

	// Templates set their own weights, so the weight axis is left out.
	let axes = $derived.by(() => {
		const face = meta?.faces.find((f) => f.file === meta.primary) ?? meta?.faces[0];
		return face?.axes.filter((a) => a.tag !== 'wght') ?? [];
	});

	function openMenu(role: Role, x: number, y: number) {
		const current = design.font(role);
		menu?.open(
			x,
			y,
			fonts
				.filter((f) => browse.pinned.includes(f.slug))
				.map((f) => ({
					label: f.name,
					font: f,
					current: f.slug === current,
					onselect: () => (design.pinned[role] = f.slug)
				}))
		);
	}
</script>

<div class="design">
	<ul class="roles" aria-label="Font roles">
		{#each design.template.roles as role (role)}
			{@const slug = design.font(role)}
			{@const pinned = design.pinned[role] !== null}
			<!-- The name button is the keyboard path; a click anywhere on the card also selects it. -->
			<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_noninteractive_element_interactions -->
			<li
				class:active={role === active}
				onclick={() => (design.active = role)}
				{@attach menuTrigger((x, y) => openMenu(role, x, y))}
			>
				<div class="head">
					<span class="role">{names[role]}</span>
					<button
						class="tool case"
						aria-pressed={design.uppercase[role]}
						aria-label="Uppercase {names[role].toLowerCase()} text"
						title="Uppercase"
						onclick={() => (design.uppercase[role] = !design.uppercase[role])}
					>
						AA
					</button>
					<button
						class="tool"
						aria-pressed={pinned}
						aria-label="{pinned ? 'Unpin' : 'Pin'} {names[role].toLowerCase()} font"
						title={pinned ? 'Unpin' : 'Pin'}
						onclick={() => design.togglePin(role)}
					>
						<svg viewBox="0 0 16 16" aria-hidden="true">
							<path d="M6 2h4M7 2v4.5L4.5 9.5h7L9 6.5V2M8 9.5V14" />
						</svg>
					</button>
				</div>
				<button
					class="name"
					aria-pressed={role === active}
					aria-label="Edit {names[role].toLowerCase()} settings"
					style:font-family={fontStack(slug)}
				>
					{nameOf(slug)}
				</button>
			</li>
		{/each}
	</ul>

	<Tuning
		{meta}
		{axes}
		own={design.tuned(active)}
		edit={(change) => design.tune(active, change)}
		axisValue={(a) => design.tuned(active).axes[a.tag] ?? a.default}
	/>
</div>

<Menu bind:this={menu} label="Pinned fonts" empty="No pinned fonts" />

<style>
	.design {
		display: grid;
		gap: var(--space-2);

		> :global(section) {
			padding-top: var(--space-2);
			border-top: 1px solid var(--border);
		}
	}

	.roles {
		display: grid;
		gap: var(--space-2);
	}

	li {
		padding: var(--space-3);
		-webkit-touch-callout: none;
		user-select: none;
		border: 1px solid var(--border);
		border-radius: var(--radius-control);

		cursor: pointer;

		&:hover {
			border-color: var(--border-strong);
		}

		&.active {
			border-color: var(--accent);
			background: var(--accent-soft);
		}
	}

	.head {
		display: flex;
		align-items: center;
	}

	.role {
		margin-right: auto;
		font-size: var(--text-sm);
		color: var(--text-muted);
	}

	.case {
		font-size: var(--text-xs);
		font-weight: 600;
		letter-spacing: 0.02em;
	}

	.tool {
		display: grid;
		place-items: center;
		width: 1.75rem;
		height: 1.75rem;
		border: 0;
		border-radius: var(--radius-control);
		background: none;
		color: var(--text-faint);
		cursor: pointer;

		&:hover {
			background: var(--surface-2);
			color: var(--text);
		}

		&[aria-pressed='true'] {
			color: var(--accent);
		}

		svg {
			width: 1rem;
			height: 1rem;
			fill: none;
			stroke: currentColor;
			stroke-width: 1.5;
			stroke-linecap: round;
			stroke-linejoin: round;
		}
	}

	.name {
		display: block;
		width: 100%;
		margin-top: var(--space-1);
		padding: 0;
		border: 0;
		background: none;
		text-align: left;
		cursor: pointer;
		font-size: 1.5rem;
		line-height: 1.25;
		color: var(--ink);
		overflow-wrap: anywhere;
	}
</style>
