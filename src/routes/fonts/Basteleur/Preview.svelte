<script lang="ts">
	import { formatDescription } from '$lib';
	import { font } from './data';
</script>

<svelte:head>
	<link rel="stylesheet" href="/font-source/Basteleur/index.css" />
</svelte:head>

<div class="preview noise">
	<h3>{font.title}</h3>
	<p>
		{@html formatDescription(font)}
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
