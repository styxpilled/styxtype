<script lang="ts">
	import Header from '$lib/ui/Header.svelte';
	import Preview from '$lib/ui/Preview.svelte';
	import Sidebar from '$lib/ui/Sidebar.svelte';
</script>

<div id="content">
	<Header />
	<div id="main">
		<Sidebar />
		<Preview />
	</div>
</div>

<style>
	#content {
		min-height: 100vh;
		max-height: 100vh;
		/* overflow: hidden; */
	}

	#main {
		display: flex;
		flex-direction: row;
		/* min-height: 100vh; */
		max-height: calc(100vh - var(--header-height));
	}
</style>
