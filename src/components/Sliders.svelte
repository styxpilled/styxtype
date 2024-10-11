<script lang="ts">
	import type { CSSSlider } from '$lib/types';

	let { sliders = $bindable() }: { sliders: CSSSlider[] } = $props();
</script>

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
			step={slider.step}
		/>
	</label>
{/each}

<style>
	span.label {
		white-space: pre;
	}
</style>
