<script lang="ts">
	import Sliders from '$components/Sliders.svelte';
	import { variationStyle } from '$lib';
	import type { CSSSlider } from '$lib/types';

	let sliders = $state<CSSSlider[]>([
		{
			label: 'Weight',
			cssProperty: 'wght',
			min: 100,
			max: 900,
			value: 400
		},
		{
			label: 'Optical Size',
			cssProperty: 'opsz',
			min: 9,
			max: 144,
			value: 20
		},
		{
			label: 'Softness',
			cssProperty: 'SOFT',
			min: 0,
			max: 100,
			value: 0
		},
		{
			label: 'Wonky',
			cssProperty: 'WONK',
			min: 0,
			max: 1,
			value: 0
		}
	]);

	// https://github.com/undercasetype/Fraunces
	// https://fraunces.undercase.xyz/
</script>

<svelte:head>
	<link rel="stylesheet" href="/font-source/Fraunces/index.css" />
</svelte:head>

<div class="preview noise-light" style={variationStyle(sliders)}>
	<h3>Fraunces</h3>
	<p>
		<a href="https://fraunces.undercase.xyz/">Fraunces</a> is a display, "Old Style" soft-serif typeface
		inspired by the mannerisms of early 20th century typefaces such as Windsor, Souvenir, and the Cooper
		Series.
	</p>
	<Sliders bind:sliders />
</div>

<style>
	.preview {
		font-family: 'Fraunces', 'Wingdings';
		color: #e89c22;
		--background: #000;
	}

	p {
		color: #fefefe;
	}
</style>
