<script lang="ts">
	import '@fontsource-variable/fredoka/wdth.css';
	import type { CSSSlider } from '$lib/types';
	import { variationStyle } from '$lib';
	import Sliders from '$components/Sliders.svelte';

	let sliders = $state<CSSSlider[]>([
		{
			label: 'Weight',
			cssProperty: 'wght',
			min: 300,
			max: 700,
			value: 700
		},
		{
			label: 'Width',
			cssProperty: 'wdth',
			min: 75,
			max: 125,
			value: 100
		}
	]);
</script>

<div class="preview" style={variationStyle(sliders)}>
	<h3>~Fredoka~</h3>
	<p>
		Fredoka is a big, round, bold font that is perfect for adding a little fun to any headline or
		large text.
	</p>
	<Sliders bind:sliders />
</div>

<style>
	.preview {
		font-family: 'Fredoka Variable', 'Wingdings';
		color: #ffbb36;
		background-color: #fcf2d9;
	}

	p {
		color: #f098ac;
	}

	*::selection {
		background-color: #ffbc3666;
	}
</style>
