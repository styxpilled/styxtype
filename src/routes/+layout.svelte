<script lang="ts">
	import Header from '$components/Header.svelte';

	import '$styles/remedy.css';
	import '$styles/app.css';
	import '$styles/buttons.css';

	import '@fontsource-variable/public-sans';

	let { children } = $props();
</script>

<div id="main" class="noise">
	<Header />
	<main class="noise-light">
		{@render children()}
	</main>
</div>

<style>
	#main {
		min-height: 100dvh;
		--background: lightskyblue;
		--bg-root: lightskyblue;

		/* overflow: hidden;
		overflow-y: scroll; */
		padding-right: 0.5rem;
		padding-bottom: 0.001rem;
		border-radius: 0;
	}

	main {
		min-height: calc(100dvh - 4.5rem);
		width: calc(100dvw - 1.5rem);
		/* overflow: hidden; */

		padding: 1rem;
		margin: 0 0.5rem;
		margin-bottom: 0.5rem;
		border-radius: 1rem;
		--background: whitesmoke;
	}
</style>
