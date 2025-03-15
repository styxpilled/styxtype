<script lang="ts">
	import { previews } from '$lib/state.svelte';
	import '@fontsource-variable/besley';
	import '@fontsource-variable/besley/wght-italic.css';
	let weight = $state(600);
	const min = 400;
	const max = 900;
</script>

<div class="preview noise" style:font-weight={weight}>
	<h3>
		{#if previews.heading}
			{previews.heading}
		{:else}
			Besley<span style="color: #471313;">*</span>
		{/if}
	</h3>
	<p>
		<a href="https://indestructibletype.com/Besley"><em>Besley*</em></a> by
		<a href="https://indestructibletype.com/"><em>Owen Earl</em></a> is an antique slab serif with a
		timeless feel. It features large, sturdy serifs which convey stability and trustworthyness.
	</p>
	<label>
		<span class="label">Weight:</span><span>{weight}</span>
		<input type="range" bind:value={weight} {min} {max} />
	</label>
</div>

<style>
	.preview {
		font-family: 'Besley Variable', 'Wingdings';
		color: #558855;
		--background: #355635;

		--background-gradient: radial-gradient(at center top, #365635, #182616);
	}

	h3 {
		color: #fff3e6;
		text-shadow: 5px 5px 10px rgba(0, 0, 0, 0.5);
	}
</style>
