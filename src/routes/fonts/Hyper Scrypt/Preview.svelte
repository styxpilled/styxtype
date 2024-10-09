<script lang="ts">
	import Title from './Title.svelte';
	// https://velvetyne.fr/fonts/hyper-scrypt/
</script>

<svelte:head>
	<link rel="stylesheet" href="/font-source/HyperScrypt/index.css" />
</svelte:head>

<div class="preview">
	<Title />
	<p>
		Hyper Scrypt is a modern stencil typeface inspired by the stained glass technique used in the
		Metz cathedral. It borrows the stained glass method, drawing holes for the light with black
		lead. This creates a reverse typeface, where the shapes of the letters are drawn by their
		counters.
	</p>
</div>

<style>
	.preview {
		font-family: 'Hyper Scrypt', 'Wingdings';
		color: rgb(194, 227, 238);
		background-color: black;
		padding: 0.5rem 0;
		padding-left: 1rem;
	}

	p {
		line-height: 1.25;
	}
</style>
