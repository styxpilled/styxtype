<script lang="ts">
	import Sliders from '$components/Sliders.svelte';
	import type { CSSSlider } from '$lib/types';

	let sliders = $state<CSSSlider[]>([
		{
			label: 'Damage',
			cssProperty: '----',
			min: 1,
			max: 5,
			value: 1
		}
	]);

	const getFamily = (slider: CSSSlider) => {
		switch (slider.value) {
			case 1:
				return 'Gensco';
			case 2:
				return 'Gensco Damaged 1';
			case 3:
				return 'Gensco Damaged 2';
			case 4:
				return 'Gensco Damaged 3';
			case 5:
				return 'Gensco Damaged 4';
			default:
				return 'Gensco';
		}
	};
</script>

<svelte:head>
	<link rel="stylesheet" href="/font-source/Gensco/index.css" />
</svelte:head>

<div class="preview noise-light" style="font-family: '{getFamily(sliders[0])}', 'Wingdings';">
	<h3>Gensco</h3>
	<p>
		<a href="https://fonderiz.fr/gensco/">Gensco</a> by
		<a href="https://cedricrossignolbrunet.com/">Cédric Rossignol-Brunet</a>, Gensco is a typeface
		created by scanning "De la nature" by Lucretia and and turning the scanned bitmaps into vector
		shapes. This gives it a gritty texture not found on most typefaces at the expense of a large
		filesize despite it's limited glyph selection.
	</p>
	<Sliders bind:sliders />
</div>

<style>
	.preview {
		color: black;
		--background: #fdf4db;
	}
</style>
