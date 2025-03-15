<script lang="ts">
	import { formatDescription } from '$lib';
	import { previews } from '$lib/state.svelte';
	import { font } from './data';
</script>

<svelte:head>
	<link rel="stylesheet" href="/font-source/Lilex/index.css" />
</svelte:head>

<div class="preview">
	<p class="spacer">&lt===&lt&lt===&lt&lt=&gt&gt===&gt&gt===&gt</p>
	<h3>&lt/{previews.heading || 'Lilex'}/&gt</h3>
	<p class="spacer">&lt===&lt&lt===&lt&lt=&gt&gt===&gt&gt===&gt</p>
	<p>
		{@html formatDescription(font)}
	</p>
</div>

<style>
	.preview {
		font-family: 'Lilex', 'Wingdings';
		color: #e6e5ff;
		--color: #e6e5ff;
		background-color: #0500ff;
		--background: #0500ff;
	}

	h3 {
		line-height: 1;
		padding-bottom: 0;
	}

	.spacer {
		color: #9da1a4;
		font-size: 3rem;
	}
</style>
