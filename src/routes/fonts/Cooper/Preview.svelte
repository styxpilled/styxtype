<script lang="ts">
	import { previews } from '$lib/state.svelte';

	let weight = $state(700);
	let min = 400;
	let max = 900;
</script>

<svelte:head>
	<link rel="stylesheet" href="/font-source/Cooper/index.css" />
</svelte:head>

<div class="preview noise" style:font-weight={weight}>
	<h3>
		{#if previews.heading}
			{previews.heading}
		{:else}
			Cooper<span style="color: #743e3e;">*</span>
		{/if}
	</h3>
	<p>
		<em><a href="https://indestructibletype.com/Cooper/">Cooper*</a></em> by
		<em><a href="https://indestructibletype.com">Owen Earl</a></em>
		is a revival of a 1922 font family by Oswald Bruce Cooper. The original is most known for it's iconic
		<em><a href="https://en.wikipedia.org/wiki/Cooper_Black">Cooper Black</a></em> font. This revival
		aims to shine some light on the more lightweight variants of the font.
	</p>
	<label>
		<span></span>
		<input type="range" bind:value={weight} {min} {max} step="100" />
	</label>
</div>

<style>
	.preview {
		font-family: 'Cooper*', 'Wingdings';
		color: #224d77;

		--background: #f2ecd9;
	}
</style>
