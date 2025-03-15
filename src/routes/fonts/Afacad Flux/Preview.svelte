<script lang="ts">
	import '@fontsource-variable/afacad-flux/slnt.css';
	import type { CSSSlider } from '$lib/types';
	import Sliders from '$components/Sliders.svelte';
	import { formatDescription, variationStyle } from '$lib';
	import { font } from './data';
	import TextPreview from '$components/TextPreview.svelte';
	import { previews } from '$lib/state.svelte';

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
	<h3>{previews.heading || font.title}</h3>
	<p>
		{@html formatDescription(font)}
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
