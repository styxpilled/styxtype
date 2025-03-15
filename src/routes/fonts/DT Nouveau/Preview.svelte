<script lang="ts">
	import { formatDescription } from '$lib';
	import { previews } from '$lib/state.svelte';

	import { font } from './data';
</script>

<svelte:head>
	<link rel="stylesheet" href="/font-source/DTNouveau/index.css" />
</svelte:head>

<div class="preview">
	<h3>{previews.heading || font.title}</h3>
	<p>
		{@html formatDescription(font)}
	</p>
</div>

<style>
	.preview {
		font-family: 'DT Nouveau', 'Wingdings';
		color: #4bfdba;
		background-color: #0f1011;
	}

	.preview :global(a:hover) {
		color: #4bfdba;
	}

	h3 {
		font-size: 7rem;
		/* text-transform: uppercase; */
	}

	h3::selection {
		background-color: #4bfdba;
		color: #0f1011;
	}

	p {
		color: #e0deda;
	}
</style>
