<script lang="ts">
	import { browse } from '#lib/browse.svelte.ts';
	import type { FontMeta } from '#lib/catalog.ts';
	import { design, type Flow, type View } from '#lib/design.svelte.ts';
	import { fontStack, loadFull, loadMeta, loadSubset } from '#lib/fonts.svelte.ts';
	import { settings } from '#lib/settings.svelte.ts';
	import { templates } from '#lib/templates/index.ts';
	import Segmented from '#lib/ui/controls/Segmented.svelte';
	import Shell from '#lib/ui/layout/Shell.svelte';
	import FontList from '#lib/ui/list/FontList.svelte';
	import Inspector from '#lib/ui/inspector/Inspector.svelte';
	import Roles from '#lib/ui/inspector/Roles.svelte';
	import Glyphs from '#lib/ui/stage/Glyphs.svelte';
	import Specimen from '#lib/ui/stage/Specimen.svelte';
	import Template from '#lib/ui/stage/Template.svelte';
	import Tester from '#lib/ui/stage/Tester.svelte';
	import ThemeSwitch from '#lib/ui/ThemeSwitch.svelte';
	import { shareUrl, sync } from '#lib/url.svelte.ts';

	$effect(sync);

	let copied = $state(false);
	let copiedTimer: ReturnType<typeof setTimeout>;

	async function copyLink() {
		await navigator.clipboard.writeText(shareUrl());
		copied = true;
		clearTimeout(copiedTimer);
		copiedTimer = setTimeout(() => (copied = false), 1500);
	}

	let font = $derived(browse.current);
	let designing = $derived(design.flow === 'design');

	let views = $state<HTMLElement>();
	// Keep the scroll position when the font changes, not when the view changes.
	$effect(() => {
		void design.view;
		void design.flow;
		void design.template;
		views?.parentElement?.scrollTo({ top: 0 });
	});

	let loadedMeta = $state<FontMeta>();
	// Hide the meta of the previous font while the new one loads.
	let meta = $derived(loadedMeta?.slug === font?.slug ? loadedMeta : undefined);

	$effect(() => {
		if (!font) return;
		// The subset is small and shows first, also when the list is not visible (mobile).
		loadSubset(font.slug);
		loadFull(font.slug).catch(() => {});
		loadMeta(font.slug)
			.then((m) => (loadedMeta = m))
			.catch(() => {});
	});
</script>

<svelte:head>
	<title>{font ? `${font.name} - styxtype` : 'styxtype'}</title>
	<meta
		name="description"
		content="Free and open source fonts. Preview each font in specimens, glyph views and design templates."
	/>
</svelte:head>

<Shell>
	{#snippet brand()}
		<div class="brand">
			<h1>styxtype</h1>
			<button
				class="copy"
				class:copied
				aria-label={copied ? 'Link copied' : 'Copy link with settings'}
				title="Copy link with settings"
				onclick={copyLink}
			>
				<svg viewBox="0 0 16 16" aria-hidden="true">
					{#if copied}
						<path d="M3 8.5l3 3 7-7" />
					{:else}
						<path d="M7 9a3 3 0 0 0 4.2 0l2.3-2.3a3 3 0 0 0-4.2-4.2L8.6 3.2" />
						<path d="M9 7a3 3 0 0 0-4.2 0L2.5 9.3a3 3 0 0 0 4.2 4.2l.7-.7" />
					{/if}
				</svg>
			</button>
		</div>
	{/snippet}

	{#snippet peek()}
		<div class="peek">
			<button aria-label="Previous font" onclick={() => browse.step(-1)}>‹</button>
			<span>{font?.name}</span>
			<button aria-label="Next font" onclick={() => browse.step(1)}>›</button>
		</div>
	{/snippet}

	{#snippet list()}
		<FontList />
	{/snippet}

	{#snippet toolbar()}
		<Segmented
			label="Flow"
			bind:value={design.flow}
			options={[
				{ value: 'inspect' as Flow, label: 'Inspect' },
				{ value: 'design' as Flow, label: 'Design' }
			]}
		/>
		{#if designing}
			<Segmented
				label="Template"
				bind:value={design.templateId}
				options={templates.map((t) => ({ value: t.id, label: t.name }))}
			/>
			<Segmented
				label="Color scheme"
				bind:value={() => design.scheme.id, (id) => (design.schemes[design.template.id] = id)}
				options={design.template.schemes.map((s) => ({ value: s.id, label: s.name }))}
			/>
		{:else}
			<Segmented
				label="View"
				bind:value={design.view}
				options={[
					{ value: 'specimen' as View, label: 'Specimen' },
					{ value: 'tester' as View, label: 'Tester' },
					{ value: 'glyphs' as View, label: 'Glyphs' }
				]}
			/>
		{/if}
	{/snippet}

	{#snippet stage()}
		{#if designing}
			<!-- Outside .views: templates use the per-role settings, not the inspect settings. -->
			<div bind:this={views} class="views fill">
				<Template />
			</div>
		{:else if font}
			{@const family = fontStack(font.slug)}
			<div
				bind:this={views}
				class="views"
				style:font-family={family}
				style:font-feature-settings={settings.featureSettings}
				style:font-variation-settings={settings.variationSettings}
				style:font-weight={settings.font.weight}
				style:font-style={settings.font.italic ? 'italic' : undefined}
			>
				{#if design.view === 'specimen'}
					<Specimen {family} metrics={meta?.metrics} text={meta?.specimen} />
				{:else if design.view === 'tester'}
					<Tester />
				{:else}
					<Glyphs {family} {meta} />
				{/if}
			</div>
		{/if}
	{/snippet}

	{#snippet inspector()}
		<div class="inspector">
			{#if designing}
				<Roles />
			{:else if font}
				<Inspector {font} {meta} text={design.view === 'tester'} />
			{/if}
			<div class="theme">
				<ThemeSwitch />
			</div>
		</div>
	{/snippet}
</Shell>

<style>
	.brand {
		display: flex;
		align-items: center;
		gap: var(--space-2);

		h1 {
			font-size: var(--text-lg);
			font-weight: 600;
			letter-spacing: -0.01em;
		}
	}

	.copy {
		display: grid;
		place-items: center;
		width: 1.75rem;
		height: 1.75rem;
		border: 0;
		border-radius: var(--radius-control);
		background: none;
		color: var(--text-muted);
		cursor: pointer;

		&:hover {
			background: var(--surface-2);
			color: var(--text);
		}

		&.copied {
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

	.peek {
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex: 1;

		span {
			font-weight: 500;
		}

		button {
			width: 2.5rem;
			height: 2.5rem;
			border: 0;
			border-radius: var(--radius-control);
			background: none;
			font-size: var(--text-xl);
			color: var(--text-muted);
			cursor: pointer;

			&:hover {
				background: var(--surface-2);
				color: var(--text);
			}
		}
	}

	.fill {
		display: flex;
		flex-direction: column;
		min-height: 100%;
	}

	.inspector {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		min-height: 100%;
		gap: var(--space-5);
	}
</style>
