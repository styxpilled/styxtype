<script lang="ts">
	let weight = $state(700);
	const min = 300;
	const max = 700;
	const step = 100;
</script>

<svelte:head>
	<link rel="stylesheet" href="/font-source/NyghtSerif/index.css" />
</svelte:head>

<div class="preview" style="font-weight: {weight};">
	<h3>Nyght Serif</h3>
	<p>
		<a href="https://www.tunera.xyz/fonts/nyght-serif/">Nyght Serif</a> by
		<a href="https://www.behance.net/mkobuzan">Maksym Kobuzan</a> is a contemporary serif with a spicy
		character. Its contrasting forms combine smooth and sharp curves, like blade serifs and spurs.
	</p>
	<label>
		<span class="label">Weight:</span><span>{weight}</span>
		<input type="range" bind:value={weight} {min} {max} {step} />
	</label>
</div>

<style>
	.preview {
		font-family: 'Nyght Serif', 'Wingdings';
		color: black;
		background-color: #fa1616;
		--background: #fa1616;
	}
</style>
