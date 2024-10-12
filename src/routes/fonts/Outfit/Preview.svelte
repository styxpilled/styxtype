<script lang="ts">
	import type { CSSSlider } from '$lib/types';

	import '@fontsource-variable/outfit';

	import { variationStyle } from '$lib';
	import Sliders from '$components/Sliders.svelte';

	let sliders = $state<CSSSlider[]>([
		{
			label: 'Weight',
			cssProperty: 'wght',
			min: 100,
			max: 1000,
			value: 400
		}
	]);
</script>

<div class="preview" style={variationStyle(sliders)}>
	<h3>outfit</h3>
	<p>
		<a href="https://github.com/Outfitio/Outfit-Fonts">Outfit</a> is a geometric sans-serif typeface
		designed as the brand typeface for for brand automation company outfit.io by
		<a href="https://www.behance.net/erreefe">Rodrigo Fuenzalida</a>.
	</p>
	<Sliders bind:sliders />
</div>

<style>
	.preview {
		font-family: 'Outfit Variable', 'Wingdings';
		background-color: #0b3e4b;
		color: #2ebf63;

		--background: #0b3e4b;
	}

	h3,
	a:hover {
		color: #fbb423;
	}

	p {
		color: #2ebf63;
	}
</style>
