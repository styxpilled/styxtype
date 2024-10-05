<script lang="ts">
	import Header from '$components/Header.svelte';
	import { onNavigate } from '$app/navigation';

	import '$styles/remedy.css';
	import '$styles/app.css';
	import '$styles/buttons.css';

	import '@fontsource-variable/public-sans';

	let { children } = $props();

	let main = $state<HTMLElement>();

	onNavigate((navigation) => {
		if (!document.startViewTransition) return;

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});
</script>

<div id="main" class="noise">
	<Header />
	<main class="noise-light" bind:this={main}>
		{@render children()}
	</main>
</div>

<style>
	#main {
		min-height: 100dvh;
		--background: lightskyblue;
		--bg-root: lightskyblue;

		view-transition-name: body;
		padding-right: 0.5rem;
		padding-bottom: 0.001rem;
		border-radius: 0;
	}

	main {
		min-height: calc(100dvh - 4.5rem);
		width: calc(100dvw - 1.5rem);
		view-transition-name: main;

		padding: 1rem;
		margin: 0 0.5rem;
		margin-bottom: 0.5rem;
		border-radius: 1rem;
		--background: whitesmoke;
	}

	/* .content {
		view-transition-name: content;
	}

	@keyframes move-out {
		from {
			transform: translateX(0%);
		}

		to {
			transform: translateX(-100%);
		}
	}

	@keyframes move-in {
		from {
			transform: translateX(100%);
		}

		to {
			transform: translateX(0%);
		}
	}

	::view-transition-old(content) {
		animation: 0.4s ease-in both move-out;
	}

	::view-transition-new(content) {
		animation: 0.4s ease-in both move-in;
	} */
</style>
