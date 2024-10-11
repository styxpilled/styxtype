<script lang="ts">
	import Sliders from '$components/Sliders.svelte';
	import { variationStyle } from '$lib';
	import type { CSSSlider } from '$lib/types';

	//https://www.paratype.com/fonts/pt/pt-root-ui

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
	<link rel="stylesheet" href="/font-source/PTRootUI/index.css" />
</svelte:head>

<div class="preview noise-light" style={variationStyle(sliders)}>
	<h3>PT Root UI</h3>
	<p>
		PT Root UI is a modern uniwidth sans serif whose individual character widths are constant across
		all weights. This is especially convenient for headers, menu bars and interface elements.
	</p>
	<p>PT Root UI was designed by Vitaly Kuzmin and released by Paratype in 2018.</p>
	<Sliders bind:sliders />
</div>

<style>
	.preview {
		font-family: 'PT Root UI VF', 'Wingdings';
		color: #020202;

		--background: #cecece;
		--background-gradient: radial-gradient(at center top, whitesmoke 40%, #797979 90%);
		/* background-color: #1a1a1a; */
	}
</style>
