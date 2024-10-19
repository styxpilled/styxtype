<script lang="ts">
	import { formatDescription } from '$lib';
	import { font } from './data';
</script>

<svelte:head>
	<link rel="stylesheet" href="/font-source/EdgeDisplay/index.css" />
</svelte:head>

<div class="preview">
	<h3>{font.title}</h3>
	<p>
		{@html formatDescription(font)}
	</p>
</div>

<style>
	.preview {
		font-family: 'Edge Display', 'Wingdings';
		color: #f2f2f2;
		--color: #f2f2f2;
		background-color: #303030;
		--background: #303030;
	}

	h3,
	.preview :global(a:hover) {
		color: #ffd83b;
		--color: #ffd83b;
	}

	h3 {
		text-decoration: underline;
		text-decoration-color: #f2f2f2;
	}
</style>
