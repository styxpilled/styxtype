<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import Sidebar from '$lib/ui/Sidebar.svelte';
	import '@fontsource-variable/jost';
	import '$lib/styles/remedy.css';
	import '$lib/styles/app.css';
	import '$lib/styles/adobeblank.css';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div id="content">
	<Sidebar />
	{@render children()}
</div>

<style>
	#content {
		display: flex;
		flex-direction: row;
	}
</style>
