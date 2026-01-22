<script lang="ts">
	import { app } from '$lib/state.svelte';
</script>

<div id="header" style="--preview-font-subset: {app.activeFont} Subset;">
	<h1>{app.activeFont}</h1>
	<span>{app.font?.category}</span>
	<span>{app.font?.license}</span>
	<a class="logo" href="/">STYXTYPE</a>
</div>

<style>
	#header {
		outline: 2px solid orange;
		outline-offset: -2px;
		height: 4.5rem;
		padding: 0 1rem;
		display: grid;
		grid-template-columns: 1fr 1fr 1fr 1fr;
		grid-template-rows: 1fr;
		font-size: 3rem;
	}

	.logo {
		/* line-height: 3rem; */
		font-size: 3rem;
		font-weight: bold;
		text-align: end;
	}

	h1 {
		font-family: var(--preview-font-subset);
	}

	span {
		text-align: center;
	}
</style>
