<script lang="ts">
	import '@fontsource-variable/gluten/slnt.css';
	import type { CSSSlider } from '$lib/types';
	import { variationStyle } from '$lib';

	let sliders = $state<CSSSlider[]>([
		{
			label: 'Weight',
			cssProperty: 'wght',
			min: 100,
			max: 900,
			value: 400
		},
		{
			label: 'Italic',
			cssProperty: 'slnt',
			min: -13,
			max: 13,
			value: 0,
			step: 0.1
		}
	]);
</script>

<div class="preview noise" style={variationStyle(sliders)}>
	<h3>Gluten</h3>
	<p>
		<a href="https://etceteratype.co/gluten">Gluten</a> by
		<a href="https://tyfromtheinternet.com">Ty Finck</a> is "slightly loud, very round, and 100% fun".
		A variable width font which can lean both left and right, and goes from a thin scribble to a truly
		lavish weight.
	</p>
	{#each sliders as slider}
		<label>
			<span class="label">{slider.label}</span><span
				style:width={slider.max.toString().length +
					(slider.step || 5).toString().length +
					(slider.min < 0 ? 1 : 0) +
					'ch'}>{slider.value}</span
			>
			<input
				type="range"
				bind:value={slider.value}
				min={slider.min}
				max={slider.max}
				step={slider.step || 1}
			/>
		</label>
	{/each}
</div>

<style>
	.preview {
		font-family: 'Gluten Variable', 'Wingdings';
		color: #fbf15f;
		--background: #3b7fd0;
	}
</style>
