<svelte:head>
	<link rel="stylesheet" href="/font-source/Pouler/index.css" />
</svelte:head>

<div class="preview">
	<h3>•Pouler•</h3>
	<p>
		<a href="https://alex-creq.com/typefaces/pouler">Pouler</a> by
		<a href="https://alex-creq.com">Alexandre Créquer</a> is a distinctly French serif, evoking the feel
		of a warm inn serving ale.
	</p>
</div>

<style>
	.preview {
		font-family: 'Pouler', 'Wingdings';
		color: #fff8eb;
		background-color: #3f52b5;
		font-feature-settings: 'dlig';
		font-size: 2rem;
	}

	h3,
	a {
		color: #eeb311;
	}

	h3::selection,
	a::selection {
		background-color: #eeb311;
		color: #3f52b5;
	}

	p::selection {
		background-color: #fff8eb;
		color: #3f52b5;
	}
</style>
