<script lang="ts">
	import MultiCheckbox from '$components/MultiCheckbox.svelte';
	import Sliders from '$components/Sliders.svelte';
	import { fontSettings, variationStyle } from '$lib';
	import { previews } from '$lib/state.svelte';
	import type { CSSSlider, Setting } from '$lib/types';

	let sliders = $state<CSSSlider[]>([
		{
			label: 'Weight',
			cssProperty: 'wght',
			min: 300,
			max: 700,
			value: 700
		}
	]);

	let settings = $state<Setting[]>([
		{
			label: 'Clean',
			value: 'ss01',
			checked: false
		},
		{
			label: 'Ligatures',
			value: 'liga',
			checked: false
		},
		{
			label: 'Numerator',
			value: 'numr',
			checked: false
		},
		{
			label: 'Denominator',
			value: 'dnom',
			checked: false
		},
		{
			label: 'Fractions',
			value: 'frac',
			checked: false
		}
	]);
</script>

<svelte:head>
	<link rel="stylesheet" href="/font-source/LibertineSuper/index.css" />
</svelte:head>

<div class="preview noise" style="{variationStyle(sliders)} {fontSettings(settings)}">
	<h3>{previews.heading || 'Libertine Super'}</h3>
	<p>
		<a href="https://noirblancrouge.com/fonts/libertinesuper/">Libertine Super</a> by the
		<a href="https://noirblancrouge.com">NoirBlancRouge</a> foundry is a sans-serif with decorative lines,
		utilising OpenType features to give more control.
	</p>
	<Sliders bind:sliders />
	<MultiCheckbox bind:settings />
</div>

<style>
	.preview {
		font-family: 'Libertine Super Variable', 'Wingdings';
		color: white;
		--background: #da0000;
		--background-gradient: radial-gradient(at center top, #da0000 0%, #000);
	}
</style>
