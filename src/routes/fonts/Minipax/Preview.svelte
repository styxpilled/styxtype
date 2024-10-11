<script lang="ts">
	import Sliders from '$components/Sliders.svelte';
	import { variationStyle } from '$lib';
	import type { CSSSlider } from '$lib/types';

	// https://github.com/ronotypo/Minipax
	// https://v-fonts.com/fonts/minipax

	let sliders = $state<CSSSlider[]>([
		{
			label: 'Weight',
			cssProperty: 'wght',
			min: 100,
			max: 600,
			value: 400
		}
	]);
</script>

<svelte:head>
	<link rel="stylesheet" href="/font-source/Minipax/index.css" />
</svelte:head>

<div class="preview noise" style={variationStyle(sliders)}>
	<h3>Minipax</h3>
	<p>
		Minipax is a typeface inspired by George Orwell's 1984. It's been designed to fit with the
		atmosphere of the Orwellian dystopia. Although Minipax remains a rather transparent text
		typeface, many of its distinctive features have been crafted to reflect de dusty and gritty
		universe of the novel.
	</p>
	<Sliders bind:sliders />
</div>

<style>
	.preview {
		font-family: 'Minipax', 'Wingdings';
		color: #eeeeee;

		--background: #7f0e0e;
		--background-gradient: radial-gradient(at center top, #fe3838, #660707 80%);
	}

	h3 {
		color: #000;
		font-variant-caps: small-caps;
		text-shadow:
			4px 4px #00adef,
			8px 8px rgba(255, 255, 255, 0.9),
			5px 5px 10px rgba(0, 0, 0, 0.5);
	}

	p {
		text-shadow:
			2px 2px rgba(0, 0, 0, 0.7),
			5px 5px 6px rgba(0, 0, 0, 0.5);
	}

	label {
		width: 50rem;
	}
</style>
