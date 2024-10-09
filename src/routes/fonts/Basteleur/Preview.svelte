<svelte:head>
	<link rel="stylesheet" href="/font-source/Basteleur/index.css" />
</svelte:head>

<!-- https://velvetyne.fr/fonts/basteleur/ -->

<div class="preview noise">
	<h3>Basteleur</h3>
	<p>
		Designed with the Tarot de Marseille in mind, Basteleur by Keussel is a blend of medieval-ish
		and cooperblack-ish typeface. The Basteleur Arcana represents a lot of things a designer can
		experience: new beginnings, having fun, crafting, but also a lack of confidence and having hard
		time to finish projects.
	</p>
</div>

<style>
	.preview {
		font-family: 'Basteleur Bold', 'Wingdings';
		color: #f0c630;
		--background: #100f02;
	}

	h3::selection,
	p::selection {
		color: #100f02;
		background: #f0c630;
	}
</style>
