<script lang="ts">
	import Sliders from '$components/Sliders.svelte';
	import { variationStyle } from '$lib';
	import type { CSSSlider } from '$lib/types';

	// https://www.paratype.com/fonts/pt/golos-ui

	let sliders = $state<CSSSlider[]>([
		{
			label: 'Weight',
			cssProperty: 'wght',
			min: 300,
			max: 700,
			value: 400
		}
	]);
</script>

<svelte:head>
	<link rel="stylesheet" href="/font-source/GolosUI/index.css" />
</svelte:head>

<div class="preview noise-light" style={variationStyle(sliders)}>
	<h3>Golos UI</h3>
	<p>
		Golos UI is an uniwidth sans-serif commissioned by Smena and AIC Media for state and social
		service websites. Golos UI suits perfectly for interfaces. Its slightly narrowed proportions
		save space in controls and menu bars. Uniwidth means that the line length is the same for all
		weights.
	</p>
	<p>
		Golos UI was designed by Alexandra Korolkova and Vitaly Kuzmin and released by Paratype in 2020.
	</p>
	<Sliders bind:sliders />
</div>

<style>
	.preview {
		font-family: 'Golos UI VF', 'Wingdings';
		color: #003151;

		--background: #cecece;
		--background-gradient: radial-gradient(at center top, whitesmoke 25%, #7fb3e3 100%);
		/* background-color: #1a1a1a; */
	}
</style>
