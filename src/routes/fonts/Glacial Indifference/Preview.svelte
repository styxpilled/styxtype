<script lang="ts">
	let weight = $state(400);
	const min = 400;
	const max = 700;
	const step = 300;
	// https://hanken.co/collections/free/products/glacial-indifference
</script>

<svelte:head>
	<link rel="stylesheet" href="/font-source/GlacialIndifference/index.css" />
</svelte:head>

<div class="preview" style="font-weight: {weight};">
	<h3>Glacial Indifference</h3>
	<p>Glacial Indifference is a simple geometric typeface.</p>
	<label>
		<span class="label">Weight:</span><span>{weight}</span>
		<input type="range" bind:value={weight} {min} {max} {step} />
	</label>
</div>

<style>
	.preview {
		font-family: 'Glacial Indifference', 'Wingdings';
		color: black;
		background-color: #c2fd0b;
	}

	h3 {
		text-transform: uppercase;
		line-height: 1;
		font-size: 7rem;
	}
</style>
