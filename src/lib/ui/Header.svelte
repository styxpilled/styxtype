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
		display: grid;
		grid-template-columns: 1fr 1fr 1fr 1fr;
		grid-template-rows: 1fr;
		padding: 0 1rem;
		font-size: 3rem;
		white-space: pre;
	}

	.logo {
		font-weight: bold;
		text-align: end;
	}

	@media (max-width: 800px) {
		#header {
			grid-template-columns: 1fr 1fr;
			grid-template-rows: 1fr 1fr;
			font-size: 2rem;
		}

		.logo {
			grid-row: 1;
			grid-column: 2;
		}
	}

	h1 {
		font-family: var(--preview-font-subset);
	}

	span {
		text-align: center;
	}
</style>
