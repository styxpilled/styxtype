<script lang="ts">
	import { app } from '$lib/state.svelte';
	import marathon from '$lib/assets/skins/marathon.json';
</script>

<div id="theme-bg">
	{#if app.activeTheme === 'marathon' && marathon}
		<div class="left">
			{marathon.frames[0]}
		</div>
		<div class="center">
			{marathon.frames2[0]}
		</div>
		<div class="detail-1"></div>
		<div class="detail-2"></div>
		<div class="detail-3"></div>
		<div class="detail-4"></div>
		<div class="detail-5"></div>
		<div class="detail-6"></div>
		<div class="detail-7"></div>
	{/if}
</div>

<style>
	#theme-bg {
		position: absolute;
		pointer-events: none;
		display: flex;
		top: 0%;
		min-height: 100vh;
		min-width: 100vw;
		height: 100%;
		width: 100%;
		flex: 1;
		color: rgba(1, 1, 1, 0.4);
		left: 0;
		z-index: -1;
		font-size: 1.4rem;
		background: var(--c1);
		overflow: hidden;
	}

	@media (max-width: 800px) {
		#theme-bg {
			flex-direction: column;
		}

		.center {
			align-self: flex-end;
		}
	}

	div {
		display: block;
		font-family: 'Code Race';
		white-space: pre;
		margin: 0;
		padding: 0;
		text-rendering: optimizeSpeed;
	}

	.left {
		letter-spacing: -1px;
		line-height: 1;
	}

	.center {
		font-size: 5rem;
		color: black;
		line-height: 0.575;
		margin-left: -2ch;
	}
</style>
