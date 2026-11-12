<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import '@fontsource-variable/jost';
	import '$lib/styles/app.css';
	import '$lib/styles/theme-marathon.css';
	import '$lib/styles/remedy.css';
	import '$lib/styles/adobeblank.css';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<link rel="preload" href="/AdobeBlank.otf.woff" as="font" type="font/woff2" />
</svelte:head>

{@render children()}
