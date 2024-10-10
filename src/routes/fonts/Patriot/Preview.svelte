<script lang="ts">
	let weight = $state(600);
	const min = 100;
	const max = 700;
	const step = 100;
</script>

<svelte:head>
	<link rel="stylesheet" href="/font-source/Patriot/index.css" />
</svelte:head>

<div class="preview" style:font-weight={weight}>
	<h3>Patriot</h3>
	<p>
		Patriot is a display sans serif typeface with a great quantity of distinctive features, from
		irregular crossbars to abrupt diagonal strokes. It also demonstrates its industrialist nature
		with a uniformity in weight, and no flourishes nor distinctions between thick and thin lines.
		Traces of Art Deco, Bauhaus and hints of Constructivism are preserved in the digital typeface,
		promising a progressive and influential voice when used in proper manners.
	</p>
	<label>
		<span class="label">Weight:</span><span>{weight}</span>
		<input type="range" bind:value={weight} {min} {max} {step} />
	</label>
</div>

<style>
	.preview {
		font-family: 'Patriot', 'Wingdings';
		color: #ffda40;
		background-color: #e20d0f;
	}
</style>
