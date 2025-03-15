<script lang="ts">
	import '@fontsource-variable/gluten/slnt.css';
	import type { CSSSlider } from '$lib/types';
	import { variationStyle } from '$lib';
	import Sliders from '$components/Sliders.svelte';
	import { previews } from '$lib/state.svelte';

	let sliders = $state<CSSSlider[]>([
		{
			label: 'Weight',
			cssProperty: 'wght',
			min: 100,
			max: 900,
			value: 400
		},
		{
			label: 'Italic',
			cssProperty: 'slnt',
			min: -13,
			max: 13,
			value: 0,
			step: 0.1
		}
	]);
</script>

<div class="preview noise" style={variationStyle(sliders)}>
	<h3>{previews.heading || 'Gluten'}</h3>
	<p>
		<a href="https://etceteratype.co/gluten">Gluten</a> by
		<a href="https://tyfromtheinternet.com">Ty Finck</a> is "slightly loud, very round, and 100% fun".
		A variable width font which can lean both left and right, and goes from a thin scribble to a truly
		lavish weight.
	</p>
	<Sliders bind:sliders />
</div>

<style>
	.preview {
		font-family: 'Gluten Variable', 'Wingdings';
		color: #fbf15f;
		--background: #3b7fd0;
	}

	*::selection {
		color: #3b7fd0;
		background-color: #7eb5f8;
	}
</style>
