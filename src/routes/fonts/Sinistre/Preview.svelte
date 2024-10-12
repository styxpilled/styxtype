<script lang="ts">
	import type { CSSSlider, Setting } from '$lib/types';
	import { fontSettings, variationStyle } from '$lib';
	import Sliders from '$components/Sliders.svelte';
	import MultiCheckbox from '$components/MultiCheckbox.svelte';

	let sliders = $state<CSSSlider[]>([
		{
			label: 'Weight',
			cssProperty: 'wght',
			min: 72,
			max: 200,
			value: 100
		}
	]);

	let settings = $state<Setting[]>([
		{
			label: 'Stylistic Set 1',
			value: 'ss01',
			checked: false
		},
		{
			label: 'Stylistic Set 2',
			value: 'ss02',
			checked: false
		},
		{
			label: 'Ligatures',
			value: 'liga',
			checked: false
		}
	]);
</script>

<svelte:head>
	<link rel="stylesheet" href="/font-source/Sinistre/index.css" />
</svelte:head>

<div class="preview noise-light" style="{variationStyle(sliders)} {fontSettings(settings)}">
	<h3>•Sinistre•</h3>
	<p>
		<a href="https://www.collletttivo.it/typefaces/sinistre">Sinistre</a> by Jules Durand (Cyrillic Support
		by Varya Goncharova) combines the Uncial minuscule, Roman proportions and subtle hints of Fraktur
		into soft letterforms and sharp terminations.
	</p>
	<Sliders bind:sliders />
	<MultiCheckbox bind:settings />
</div>

<style>
	.preview {
		font-family: 'Sinistre', 'Wingdings';
		color: #1e211d;
		--background: #f1cc79;
	}
</style>
