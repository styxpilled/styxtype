<script lang="ts">
	import type { CSSSlider } from '$lib/types';
	import Sliders from '$components/Sliders.svelte';
	import { variationStyle } from '$lib';

	let sliders = $state<CSSSlider[]>([
		{
			label: 'Weight',
			cssProperty: 'wght',
			min: 200,
			max: 600,
			value: 400,
			step: 100
		}
	]);
</script>

<svelte:head>
	<link rel="stylesheet" href="/font-source/Roundo/index.css" />
</svelte:head>

<div class="preview" style="font-weight: {sliders[0].value};">
	<h3>Roundo</h3>
	<p>
		Roundo is a geometric sans serif typeface, optimized for headlines and other on-screen
		display-sized text. Roundo's Latin-script character set is made up of top-heavy letters; this
		reverse contrast is particularly visible in Roundo's lowercase letters. The typeface's lowercase
		also sports a nice hybridization of geometric sans and humanistic sans design features.
	</p>
	<Sliders bind:sliders />
</div>

<style>
	.preview {
		font-family: 'Roundo', 'Wingdings';
		color: #ffffb8;
		background-color: #0b0c0d;
		--background: #0b0c0d;
	}

	*::selection {
		color: #0b0c0d;
		background-color: #ffffb8;
	}
</style>
