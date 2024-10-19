<script lang="ts">
	import '@fontsource-variable/suse';
	import { font } from './data';
	import { formatDescription, variationStyle } from '$lib';
	import Sliders from '$components/Sliders.svelte';
	import type { CSSSlider } from '$lib/types';

	let sliders = $state<CSSSlider[]>([
		{
			label: 'Weight',
			cssProperty: 'wght',
			min: 100,
			max: 800,
			value: 600
		}
	]);
</script>

<div class="preview" style={variationStyle(sliders)}>
	<h3>{font.title}</h3>
	<p>
		{@html formatDescription(font)}
	</p>
	<Sliders bind:sliders />
</div>

<style>
	.preview {
		font-family: 'SUSE Variable', 'Wingdings';
		color: white;
		background-color: #0b322c;
	}

	h3 {
		font-weight: 600;
	}

	p {
		color: #30ba78;
	}
</style>
