<script lang="ts">
	import { browse } from '#lib/browse.svelte.ts';
	import Segmented from '#lib/ui/controls/Segmented.svelte';
	import Shell from '#lib/ui/layout/Shell.svelte';
	import FontList from '#lib/ui/list/FontList.svelte';
	import ThemeSwitch from '#lib/ui/ThemeSwitch.svelte';

	// Stage and inspector are placeholders until issues 010-012.
	let view = $state<'specimen' | 'glyphs'>('specimen');
	let font = $derived(browse.current);
</script>

<svelte:head>
	<title>{font ? `${font.name} - styxtype` : 'styxtype'}</title>
</svelte:head>

<Shell>
	{#snippet brand()}
		<h1 class="brand">styxtype</h1>
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
			label="View"
			bind:value={view}
			options={[
				{ value: 'specimen', label: 'Specimen' },
				{ value: 'glyphs', label: 'Glyphs' }
			]}
		/>
	{/snippet}

	{#snippet stage()}
		<p class="placeholder" style:font-family="'{font?.slug} subset', var(--font-ui)">
			{font?.name}
		</p>
	{/snippet}

	{#snippet inspector()}
		<div class="inspector">
			<p class="label">Settings for {font?.name}</p>
			<div class="theme">
				<ThemeSwitch />
			</div>
		</div>
	{/snippet}
</Shell>

<style>
	.brand {
		font-size: var(--text-lg);
		font-weight: 600;
		letter-spacing: -0.01em;
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

	.placeholder {
		font-size: clamp(2.5rem, 8vw, 6rem);
		color: var(--ink);
	}

	.inspector {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		min-height: 100%;
		gap: var(--space-5);
	}
</style>
