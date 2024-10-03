<script lang="ts">
	import Header from '$components/Header.svelte';
	import '$styles/app.css';
	import '$styles/remedy.css';
	import '$styles/buttons.css';

	import '@fontsource-variable/public-sans';

	let { children } = $props();
</script>

<div id="main" class="noise">
	<Header />
	<main class="noise">{@render children()}</main>
	<div></div>
</div>

<style>
	#main {
		min-height: 100dvh;
		/* width: 100dvw; */
		--background: lightskyblue;
		overflow: hidden;
		overflow-y: scroll;
		padding-right: 0.5rem;
	}

	main {
		min-height: calc(100dvh - 4rem);
		width: calc(100dvw - 1.5rem);
		overflow: hidden;

		padding: 1rem;
		margin: 0 0.5rem;
		margin-bottom: 0.5rem;
		--background: whitesmoke;
		border-radius: 1rem;
		border: 2px solid var(--background);
	}

	:global(.noise) {
		/* background:
			linear-gradient(to left, var(--background, red) 100dvw, blue),
			repeating-radial-gradient(#828282 0 0.0001%, rgba(244, 244, 244, 0.486) 0 0.0002%) 10% 0/2500px
				2500px,
			repeating-conic-gradient(rgb(0, 0, 0) 0 0.0001%, rgb(255, 255, 255) 0 0.0002%) 60% 60% /
				2500px 2500px; */
		background:
			var(--background-gradient, linear-gradient(to left, var(--background, red) 100dvw, blue)),
			repeating-radial-gradient(#828282 0 0.0001%, rgba(244, 244, 244, 0.486) 0 0.0002%) 10% 0/ 512px
				512px,
			repeating-conic-gradient(rgb(0, 0, 0) 0 0.0001%, rgb(255, 255, 255) 0 0.0002%) 60% 60% / 512px
				512px;
		background-position: center;
		background-blend-mode: overlay, difference, difference;
	}
</style>
