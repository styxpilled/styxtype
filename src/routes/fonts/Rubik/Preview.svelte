<script lang="ts">
	import Sliders from '$components/Sliders.svelte';
	import { variationStyle } from '$lib';
	import type { CSSSlider } from '$lib/types';

	// https://hfs-studio.com/
	// https://fonts.google.com/specimen/Rubik

	let sliders = $state<CSSSlider[]>([
		{
			label: 'Weight',
			cssProperty: 'wght',
			min: 300,
			max: 900,
			value: 500
		}
	]);
</script>

<svelte:head>
	<link rel="stylesheet" href="/font-source/Rubik/index.css" />
</svelte:head>

<div class="preview" style={variationStyle(sliders)}>
	<h3>RUBIK</h3>
	<p>
		Rubik is a sans serif font family with slightly rounded corners designed by <a
			href="https://hfs-studio.com/"
		>
			Philipp Hubert and Sebastian Fischer
		</a>. Rubik is a 5 weight family with Roman and Italic styles, that accompanies Rubik Mono One,
		a monospaced variation of the Black roman design.
	</p>
	<Sliders bind:sliders />
</div>

<style>
	.preview {
		font-family: 'Rubik', 'Wingdings';
		color: #ffffff;

		--background: #e83956;
		background-color: #e83956;
	}
</style>
