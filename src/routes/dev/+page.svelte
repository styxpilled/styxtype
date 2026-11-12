<script lang="ts">
	// Design test page. Remove before deploy (issue 026).
	import type { FontMeta } from '#lib/catalog.ts';
	import Button from '#lib/ui/controls/Button.svelte';
	import Search from '#lib/ui/controls/Search.svelte';
	import Segmented from '#lib/ui/controls/Segmented.svelte';
	import Slider from '#lib/ui/controls/Slider.svelte';
	import Switch from '#lib/ui/controls/Switch.svelte';
	import MetricSpecimen from '#lib/ui/MetricSpecimen.svelte';
	import ThemeSwitch from '#lib/ui/ThemeSwitch.svelte';
	import { onMount } from 'svelte';

	const colors = [
		'bg',
		'surface',
		'surface-2',
		'border',
		'border-strong',
		'text',
		'text-muted',
		'text-faint',
		'ink',
		'accent',
		'accent-soft',
		'guide'
	];
	const sizes = ['xs', 'sm', 'md', 'lg', 'xl'];

	let query = $state('');
	let size = $state(96);
	let weight = $state(400);
	let liga = $state(true);
	let kern = $state(false);
	let view = $state<'specimen' | 'glyphs' | 'templates'>('specimen');
	let meta = $state<FontMeta>();

	onMount(async () => {
		meta = await (await fetch('/fonts/fraunces/meta.json')).json();
		const face = new FontFace('Fraunces Test', 'url(/fonts/fraunces/Fraunces.woff2)', {
			weight: '100 900'
		});
		document.fonts.add(await face.load());
	});
</script>

<svelte:head>
	<title>Design test</title>
</svelte:head>

<main>
	<header>
		<h1>Design test</h1>
		<ThemeSwitch />
	</header>

	<section class="panel">
		<h2>Metric guides</h2>
		{#if meta}
			<div style:font-variation-settings="'wght' {weight}">
				<MetricSpecimen
					family="Fraunces Test"
					metrics={meta.metrics}
					text="Hamburgefonstiv"
					{size}
				/>
			</div>
		{/if}
	</section>

	<div class="row">
		<section class="panel controls">
			<h2>Controls</h2>
			<Search bind:value={query} label="Search fonts" placeholder="Search fonts" />
			<Segmented
				label="View"
				bind:value={view}
				options={[
					{ value: 'specimen', label: 'Specimen' },
					{ value: 'glyphs', label: 'Glyphs' },
					{ value: 'templates', label: 'Templates' }
				]}
			/>
			<Slider label="Size" bind:value={size} min={12} max={200} unit="px" />
			<Slider label="Weight" bind:value={weight} min={100} max={900} />
			<Switch label="Ligatures" bind:checked={liga} />
			<Switch label="Kerning" bind:checked={kern} />
			<div class="buttons">
				<Button>Reset</Button>
				<Button variant="ghost">Cancel</Button>
			</div>
		</section>

		<section class="panel">
			<h2>Type scale</h2>
			{#each sizes as s (s)}
				<p style:font-size="var(--text-{s})">Text {s}: The quick brown fox, 0123456789</p>
			{/each}
			<p class="label">Label: font size</p>
		</section>
	</div>

	<section class="panel">
		<h2>Colors</h2>
		<ul class="swatches">
			{#each colors as c (c)}
				<li>
					<span class="swatch" style:background="var(--{c})"></span>
					<span class="label">{c}</span>
				</li>
			{/each}
		</ul>
	</section>
</main>

<style>
	main {
		display: grid;
		gap: var(--space-4);
		max-width: 64rem;
		margin: 0 auto;
		padding: var(--space-5) var(--space-4);
	}

	header {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	h1 {
		font-size: var(--text-xl);
		font-weight: 600;
	}

	h2 {
		margin-bottom: var(--space-3);
		font-size: var(--text-sm);
		font-weight: 600;
	}

	section {
		padding: var(--space-4);
		overflow: hidden;
	}

	.row {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(18rem, 1fr));
		gap: var(--space-4);
	}

	.controls {
		display: grid;
		gap: var(--space-4);
		align-content: start;
	}

	.buttons {
		display: flex;
		gap: var(--space-2);
	}

	.swatches {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(7rem, 1fr));
		gap: var(--space-3);
	}

	.swatch {
		display: block;
		height: 2.5rem;
		margin-bottom: var(--space-1);
		border: 1px solid var(--border);
		border-radius: var(--radius-chip);
	}
</style>
