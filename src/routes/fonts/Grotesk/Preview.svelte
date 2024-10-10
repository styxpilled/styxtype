<script lang="ts">
	let weight = $state(600);
	const min = 400;
	const max = 900;
</script>

<svelte:head>
	<link rel="stylesheet" href="/font-source/Grotesk/index.css" />
</svelte:head>

<div class="preview" style:font-weight={weight}>
	<h3>Grotesk</h3>
	<p>
		Grotesk is a heavily geometric sans serif typeface with an unusually large spacing. It features
		broken glyphs, sharp angles and a subtle art-deco flavor.
	</p>
	<label>
		<span class="label">Weight:</span><span>{weight}</span>
		<input type="range" bind:value={weight} {min} {max} />
	</label>
</div>

<style>
	.preview {
		font-family: 'Grotesk', 'Wingdings';
		color: black;
		background-color: white;
	}
</style>
