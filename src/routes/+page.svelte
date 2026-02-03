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
	<svg xmlns="http://www.w3.org/2000/svg" version="1.1" height="0" width="0">
		<defs>
			<filter id="noise">
				<feTurbulence baseFrequency="0.05" numOctaves="2" type="fractalNoise" result="result1" />
				<feDisplacementMap
					in2="result1"
					scale="9"
					result="result2"
					xChannelSelector="R"
					in="SourceGraphic"
				/>
				<feComposite in2="result3" in="SourceGraphic" operator="atop" result="fbSourceGraphic" />
			</filter>
			<filter id="noise-small">
				<feTurbulence baseFrequency="0.05" numOctaves="2" type="fractalNoise" result="result1" />
				<feDisplacementMap
					in2="result1"
					scale="5"
					result="result2"
					xChannelSelector="R"
					in="SourceGraphic"
				/>
				<feComposite in2="result3" in="SourceGraphic" operator="atop" result="fbSourceGraphic" />
			</filter>
		</defs>
	</svg>
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
