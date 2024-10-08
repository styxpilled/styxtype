<script lang="ts">
	import { variationStyle } from '$lib';
	import type { CSSSlider } from '$lib/types';

	('ops GRAD XTRA XOPQ YOPQ YTLC YTUC YTAS YTDE YTFI');

	let sliders = $state<CSSSlider[]>([
		{
			label: 'Weight',
			cssProperty: 'wght',
			min: 100,
			max: 1000,
			value: 400
		},
		{
			label: 'Width',
			cssProperty: 'wdth',
			min: 50,
			max: 125,
			value: 100
		},
		{
			label: 'Optical Size',
			cssProperty: 'opsz',
			min: 8,
			max: 144,
			value: 20
		},
		{
			label: 'Grade',
			cssProperty: 'GRAD',
			min: -300,
			max: 500,
			value: 0
		},
		{
			label: 'X Transparent',
			cssProperty: 'XTRA',
			min: 324,
			max: 640,
			value: 562
		}
	]);
</script>

<svelte:head>
	<link rel="stylesheet" href="/font-source/Amstelvar/index.css" />
</svelte:head>

<div class="preview noise" style={variationStyle(sliders)}>
	<h3>Amstelvar</h3>
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
		font-family: 'Amstelvar Roman', 'Wingdings';
		color: rgb(39, 34, 34);

		--background: #b0bf9a;
		--background-gradient: radial-gradient(at center top, #b0bf9a, #434343);
	}

	h3 {
		text-shadow:
			-2px -2px rgba(255, 255, 255, 0.333),
			2px 2px 7px rgba(0, 0, 0, 0.5);
		/* text-shadow: 5px 5px 10px rgba(0, 0, 0, 0.5); */
	}

	label {
		word-break: keep-all;
		white-space: pre;
		/* width: 5rem; */
	}
</style>
