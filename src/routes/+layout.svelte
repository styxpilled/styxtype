<script lang="ts">
	import Header from '$components/Header.svelte';
	import '$styles/app.css';
	import '$styles/remedy.css';
	import '$styles/buttons.css';

	import '@fontsource-variable/public-sans';

	let { children } = $props();
</script>

<div id="main">
	<Header />
	{@render children()}
</div>
<div id="overlay"></div>

<style>
	#main {
		height: 100dvh;
		width: 100dvw;
		background-color: whitesmoke;
	}

	#overlay {
		pointer-events: none;
		position: fixed;
		top: 0;
		left: 0;
		height: 100dvh;
		width: 100dvw;
		/* BY GODS IT WORKS */
		background:
			repeating-radial-gradient(#3d3d3d 0 0.0001%, #717171 0 0.0002%) 50% 0/2500px 2500px,
			repeating-conic-gradient(#323232 0 0.0001%, #818181 0 0.0002%) 60% 60% / 2500px 2500px;
		background-blend-mode: difference;
		mix-blend-mode: overlay;
	}
</style>
