<script lang="ts">
	let weight = $state(600);
	const min = 100;
	const max = 600;
	const step = 100;

	// https://www.tunera.xyz/fonts/picaflor/
	// https://www.tunera.xyz/site/assets/files/1372/picaflor-specimen-web.pdf
	let style = $state(1);
	const styleMin = 0;
	const styleMax = 6;
</script>

<svelte:head>
	<link rel="stylesheet" href="/font-source/Picaflor/index.css" />
</svelte:head>

<div class="preview noise-light" style="font-weight: {weight}; font-feature-settings: 'ss0{style}'">
	<h3>«Picaflor»</h3>
	<p>
		<a href="https://www.tunera.xyz/fonts/picaflor/">Picaflor</a> by
		<a href="https://arielmartinperez.com/">Ariel Martín Pérez</a> is a hybrid display typeface with
		calligraphic details - French didone meet Spanish vernacular exhuberance.
	</p>
	<label>
		<span class="label">Weight:</span><span>{weight}</span>
		<input type="range" bind:value={weight} {min} {max} {step} />
	</label>
	<label>
		<span class="label">Style:</span><span>{style}</span>
		<input type="range" bind:value={style} min={styleMin} max={styleMax} />
	</label>
</div>

<style>
	.preview {
		font-family: 'Picaflor', 'Wingdings';
		color: #fbd363;
		--background: #42893f;
		--background-gradient: radial-gradient(at center top, #42893f 50%, #1b5519);
	}

	*::selection {
		background: #1746153f;
	}
</style>
