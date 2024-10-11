<script lang="ts">
	import type { CSSSlider } from '$lib/types';
	import Sliders from './Sliders.svelte';

	let {
		sliders = $bindable([
			{
				cssProperty: 'font-size',
				label: 'Size',
				max: 96,
				min: 12,
				value: 36,
				unit: 'px'
			},
			{
				cssProperty: 'letter-spacing',
				label: 'Letter Spacing',
				max: 12,
				min: -12,
				value: 1,
				unit: 'px',
				step: 0.001
			},
			{
				cssProperty: 'line-height',
				label: 'Line height',
				max: 2,
				min: 0.5,
				value: 1,
				unit: '',
				step: 0.001
			}
		])
	}: {
		sliders?: CSSSlider[];
	} = $props();
</script>

<div class="specimen">
	<div class="sliders row">
		<Sliders bind:sliders />
	</div>
	<div
		class="showcase"
		style={sliders
			.map((slider) => `${slider.cssProperty}: ${slider.value}${slider.unit || ''}`)
			.join(';')}
	>
		It is not the duty of the typographer to consciously display or emulate the style of current
		trends, not to reflect the spirit of the times.
	</div>
</div>

<style>
	.specimen {
		background-color: white;
		color: black;
		padding: 1rem;
		border-radius: 1rem;
		width: calc(100dvw - 3.5rem);
		height: 32rem;
		overflow: hidden;
	}

	.specimen *::selection {
		color: white;
		background-color: black;
	}

	.showcase {
		margin-top: 4rem;
	}

	.sliders.row {
		gap: 2rem;
		flex-wrap: wrap;
	}
</style>
