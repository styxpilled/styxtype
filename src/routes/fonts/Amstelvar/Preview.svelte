<script lang="ts">
	import Sliders from '$components/Sliders.svelte';
	import { formatDescription, variationStyle } from '$lib';
	import { previews } from '$lib/state.svelte';
	import type { CSSSlider } from '$lib/types';
	import { font } from './data';

	('ops GRAD XTRA XOPQ YOPQ YTLC YTUC YTAS YTDE YTFI');

	let sliders = $state<CSSSlider[]>([
		{
			label: 'Weight',
			cssProperty: 'wght',
			min: 100,
			max: 1000,
			value: 400
		},
		{
			label: 'Width',
			cssProperty: 'wdth',
			min: 50,
			max: 125,
			value: 100
		},
		{
			label: 'Optical Size',
			cssProperty: 'opsz',
			min: 8,
			max: 144,
			value: 20
		},
		{
			label: 'Grade',
			cssProperty: 'GRAD',
			min: -300,
			max: 500,
			value: 0
		},
		{
			label: 'X Transparent',
			cssProperty: 'XTRA',
			min: 324,
			max: 640,
			value: 562
		}
	]);
</script>

<svelte:head>
	<link rel="stylesheet" href="/font-source/Amstelvar/index.css" />
</svelte:head>

<div class="preview noise-light" style={variationStyle(sliders)}>
	<h3>
		{previews.heading || font.title}
	</h3>
	<hr class="thick" />
	<p>
		{@html formatDescription(font)}
	</p>
	<Sliders bind:sliders />
</div>

<style>
	.preview {
		font-family: 'Amstelvar Roman', 'Wingdings';
		color: #2e2e2e;

		--background: #ecebe7;
		--background-gradient: radial-gradient(at center top, #ecebe7 50%, #b0b0ad);
	}

	h3 {
		line-height: 1;
		text-shadow:
			-2px -2px rgba(255, 255, 255, 0.333),
			2px 2px 7px rgba(0, 0, 0, 0.5);
	}
</style>
