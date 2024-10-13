<script lang="ts">
	import '@fontsource-variable/afacad-flux/slnt.css';
	import type { CSSSlider } from '$lib/types';
	import Sliders from '$components/Sliders.svelte';
	import { variationStyle } from '$lib';

	let sliders = $state<CSSSlider[]>([
		{
			label: 'Weight',
			cssProperty: 'wght',
			min: 100,
			max: 1000,
			value: 400
		},
		{
			label: 'Slant',
			cssProperty: 'slnt',
			min: -14,
			max: 14,
			value: 0
		}
	]);
</script>

<div class="preview" style={variationStyle(sliders)}>
	<h3>Afacad Flux</h3>
	<p>
		The letters and numerals of <a href="https://github.com/Dicotype/Afacad">Afacad Flux</a> by
		<a href="https://github.com/ktkm">Kristian Möller</a> were meticulously crafted to harmonise with
		the architectural proportions and materials employed by Architect Sture Elmén during the 1940s.
	</p>
	<Sliders bind:sliders />
</div>

<style>
	.preview {
		font-family: 'Afacad Flux Variable', 'Wingdings';
		color: #aeabac;
		background-color: #2c2b2b;
		--background: #2c2b2b;
	}
</style>
