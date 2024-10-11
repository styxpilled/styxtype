<script lang="ts">
	import '@fontsource-variable/fredoka/wdth.css';
	import type { CSSSlider } from '$lib/types';
	import { variationStyle } from '$lib';

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

	let weight = $state(500);
	const min = 300;
	const max = 700;
	const step = 100;
</script>

<div class="preview" style={variationStyle(sliders)}>
	<h3>~Fredoka~</h3>
	<p>
		Fredoka is a big, round, bold font that is perfect for adding a little fun to any headline or
		large text.
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
