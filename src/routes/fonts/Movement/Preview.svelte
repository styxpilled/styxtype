<script lang="ts">
	import { variationStyle } from '$lib';
	import type { CSSSlider } from '$lib/types';

	// https://v-fonts.com/fonts/movement-variable
	// https://www.nmtype.com/movement/

	let sliders = $state<CSSSlider[]>([
		{
			label: 'Weight',
			cssProperty: 'wght',
			min: 100,
			max: 900,
			value: 400
		},
		{
			label: 'Space',
			cssProperty: 'SPAC',
			min: 100,
			max: 120,
			value: 100
		}
	]);
</script>

<svelte:head>
	<link rel="stylesheet" href="/font-source/Movement/index.css" />
</svelte:head>

<div class="preview" style={variationStyle(sliders)}>
	<h3>Movement</h3>
	<p>
		Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ullam, quod accusantium? Optio quidem
		dolorum, minus modi perspiciatis aliquid tempore explicabo eaque consequuntur amet omnis impedit
		sint ratione, quasi pariatur nesciunt.
	</p>
	{#each sliders as slider}
		<label>
			<span class="label">{slider.label}</span><span
				style:width={slider.max.toString().length +
					(slider.step || 5).toString().length +
					(slider.min < 0 ? 1 : 0) +
					'ch'}>{slider.value}</span
			>
			<input type="range" bind:value={slider.value} min={slider.min} max={slider.max} />
		</label>
	{/each}
</div>

<style>
	.preview {
		font-family: 'Movement', 'Wingdings';
		color: #ffffff;

		--background: #1a1a1a;
		background-color: #1a1a1a;
	}

	h3 {
		text-shadow: 4px 4px 10px rgba(0, 0, 0, 0.5);
	}

	label {
		width: 50rem;
	}
</style>
