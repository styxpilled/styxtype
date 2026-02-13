<script lang="ts">
	import { app, themeData } from '$lib/state.svelte';
	import { onMount } from 'svelte';
	import marathon from '$lib/assets/skins/marathon.json';
	// onMount(() => {
	// if (themeData.marathon === null) import('$lib/assets/skins/marathon.json').then((v) => {
	// 	themeData.marathon = v.default;
	// });
	// });

	let currFrame = $state(0);
</script>

<div id="theme-bg">
	{#if app.activeTheme === 'marathon' && marathon}
		{@const frames = marathon.frames}
		<div class="left">
			{#each frames[currFrame].split('\n') as line}
				<span>{line}</span>
			{/each}
		</div>
		<div class="center">
			{#each marathon.frames2[0].split('n') as line, i}
				<span>{line}</span>
				<!-- <span>0123401234</span>
				<span>{i.toString().repeat(10)}</span>
				<span>{i.toString().repeat(10)}</span> -->
			{/each}
		</div>
	{/if}
</div>

<style>
	#theme-bg {
		position: absolute;
		pointer-events: none;
		display: flex;
		top: 0%;
		/* min-width: 100vw;
		min-height: 100vh; */
		/* width: auto; */
		/* height: auto; */
		/* max-height: 100%;
		max-width: 100%; */
		min-height: 100vh;
		min-width: 100vw;
		height: 100%;
		width: 100%;
		flex: 1;
		/* filter: blur(1px); */
		color: rgba(1, 1, 1, 0.496);
		/* transform: translateY(-50%); */
		left: 0;
		z-index: -1;
		font-size: 1.4rem;
		background: var(--c1);

		div {
			overflow: hidden;
		}
	}

	@media (max-width: 800px) {
		#theme-bg {
			flex-direction: column;
		}
	}

	span {
		background: var(--c1);
		display: block;
		font-family: monospace;
		font-family: 'Code Race';
		white-space: pre;
		/* font-size: 5rem; */
		margin: 0;
		padding: 0;
		/* color: black; */
		/* line-height: 0.575; */
		text-rendering: optimizeSpeed;
		/* height: 2.25rem; */
	}

	.left {
		letter-spacing: -1px;
		line-height: 1;
	}

	.center span {
		background: var(--c1);
		display: block;
		font-family: monospace;
		font-family: 'Code Race';
		white-space: pre;
		font-size: 5rem;
		color: black;
		line-height: 0.575;
		text-rendering: optimizeSpeed;
		/* height: 2.25rem; */
	}
</style>
