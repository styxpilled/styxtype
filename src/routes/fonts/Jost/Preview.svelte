<script lang="ts">
	import { previews } from '$lib/state.svelte';
	import '@fontsource-variable/jost';
	let weight = $state(400);
	let min = 100;
	let max = 900;
</script>

<div class="preview" style:font-weight={weight}>
	<h3>
		{#if previews.heading}
			{previews.heading}
		{:else}
			Jost<span style="color: #c83737;">*</span>
		{/if}
	</h3>
	<p>
		<em><a href="https://indestructibletype.com/Jost">Jost*</a></em> by
		<em><a href="https://indestructibletype.com">Owen Earl</a></em> is a spiritual successor to the famous
		Futura typeface.
	</p>
	<label>
		<span class="label">Weight:</span><span>{weight}</span>
		<input type="range" bind:value={weight} {min} {max} />
	</label>
</div>

<style>
	.preview {
		font-family: 'Jost Variable', 'Wingdings';
		color: #333333;
	}

	a:hover {
		color: #c83737;
	}
</style>
