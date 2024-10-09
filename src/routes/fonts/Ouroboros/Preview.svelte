<svelte:head>
	<link rel="stylesheet" href="/font-source/Ouroboros/index.css" />
</svelte:head>

<!-- https://velvetyne.fr/fonts/ouroboros/ -->
<!-- ♈︎♉︎♊︎♋︎♌︎♍︎♎︎♏︎♐︎♑︎♒︎♓︎ -->

<div class="preview">
	<div class="noise-bg-color"></div>
	<div class="noise-bg"></div>
	<div class="desc">
		<h3 class="">Ouroboros</h3>
		<p class="">
			Ouroboros is also a font for alchemists, witches, heretics, outsiders and curious people in
			general. It's inspired by early art-nouveau styles, which were sometimes used in relation with
			magical themes and symbolism, so it comes together with a set of alchemical and astronomical
			symbols.
		</p>
	</div>
</div>

<style>
	.preview {
		font-family: 'Ouroboros', 'Wingdings';
		color: #191919;
		padding: 0;
		background-color: #191919;
		border-radius: 1rem;
		background-attachment: fixed;
		position: relative;
	}

	.desc {
		position: absolute;
		z-index: 5;
	}

	.noise-bg-color {
		position: absolute;
		width: calc(100dvw - 3.5rem);
		max-width: 100dvw;
		height: 24rem;
		background-color: #fad223;
		isolation: isolate;
		mix-blend-mode: color;
		z-index: 1;
	}

	.noise-bg {
		border-radius: 1rem;
		width: calc(100dvw - 3.5rem);
		max-width: 100dvw;
		height: 24rem;

		filter: contrast(650%) brightness(10000%) invert() grayscale(100) contrast(2500%);
		background: radial-gradient(circle at 50% -225%, #1b26ff 5%, rgba(0, 0, 0, 0)), url(/noise.svg);
		background-blend-mode: multiply;
	}

	p {
		color: #dcb405;
		background-color: #19191990;
	}

	p::selection {
		background-color: #dcb405;
		color: #191919;
	}

	h3::selection {
		color: #dcb405;
		background-color: #191919;
	}
</style>
