<script lang="ts">
	import Sliders from '$components/Sliders.svelte';
	import { variationStyle } from '$lib';
	import type { CSSSlider } from '$lib/types';

	// https://github.com/twardoch/varfonts-ofl/tree/master/ZinzinVF-OFL
	// https://v-fonts.com/fonts/zinzin-vf
	// https://ndiscover.com/cinzel/
	// https://fonts.google.com/specimen/Cinzel+Decorative/about

	let sliders = $state<CSSSlider[]>([
		{
			label: 'Swash',
			cssProperty: 'SWSH',
			min: 100,
			max: 1000,
			value: 330
		}
	]);
</script>

<svelte:head>
	<link rel="stylesheet" href="/font-source/ZinzinVF/index.css" />
</svelte:head>

<div class="preview noise" style={variationStyle(sliders)}>
	<h3>ZinzinVf</h3>
	<p>
		A variable test font based on Cinzel and Cinzel Decorative. The swash axis gradually replaces
		the uppercase with swash glyphs and the lowercase with larger capitals.
	</p>
	<Sliders bind:sliders />
</div>

<style>
	.preview {
		font-family: 'ZinzinVF', 'Wingdings';
		color: #c5d3e2;

		--background: #0082c0;
		--background-gradient: radial-gradient(at center top, #0082c0, #022130);
	}

	h3 {
		text-shadow: 4px 4px 10px rgba(0, 0, 0, 0.5);
	}
</style>
