<script lang="ts">
	import '@fontsource-variable/ojuju';
	import { formatDescription } from '$lib';
	import { font } from './data';
	import Sliders from '$components/Sliders.svelte';
	import { variationStyle } from '$lib';
	import type { CSSSlider } from '$lib/types';

	let sliders = $state<CSSSlider[]>([
		{
			label: 'Weight',
			cssProperty: 'wght',
			min: 300,
			max: 800,
			value: 700
		}
	]);
</script>

<!-- https://github.com/jobosonchisa/ojuju -->
<div class="preview" style={variationStyle(sliders)}>
	<h3>{font.title}</h3>
	<p>
		{@html formatDescription(font)}
	</p>
	<Sliders bind:sliders />
</div>

<style>
	.preview {
		font-family: 'Ojuju Variable', 'Wingdings';
		color: #652004;
		background-color: #f9ecca;
	}

	h3 {
		color: #ec5f12;
	}
</style>
