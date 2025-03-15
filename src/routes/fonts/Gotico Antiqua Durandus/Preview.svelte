<script lang="ts">
	import { previews } from '$lib/state.svelte';
</script>

<svelte:head>
	<link rel="stylesheet" href="/font-source/GoticoAntiquaDurandus/index.css" />
</svelte:head>

<!-- https://github.com/anrt-type/GoticoAntiqua -->

<div class="preview noise">
	<h3>{previews.heading || 'Gotico Antiqua Durandus'}</h3>
	<p>
		Gotico-Antiqua first used in Mainz by Peter Schoffer & Johann Fust for Guillaume Durand’s
		Rationale Divinorum Officorum in the XIV century.
	</p>
</div>

<style>
	.preview {
		font-family: 'Gotico Antiqua Durandus', 'Wingdings';
		color: black;
		font-feature-settings:
			'kern' on,
			'liga' on;
		--background: rgb(235, 221, 170);
		padding: 4rem 0;
	}

	h3 {
		line-height: 0.8;
		padding-bottom: 1rem;
	}
</style>
