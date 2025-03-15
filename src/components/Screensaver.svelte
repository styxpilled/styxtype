<script lang="ts">
	let timeout = -1;

	let showing = $state(false);
</script>

<svelte:document
	onvisibilitychange={() => {
		if (document.visibilityState === 'hidden') {
			showing = true;
		}
	}}
	onmousemove={() => {
		showing = false;
		clearTimeout(timeout);
		timeout = setTimeout(() => {
			showing = true;
		}, 25000);
	}}
/>

<div class="screensaver col space" class:showing>
	{#each { length: 1 } as _, i}
		<p class="marquee-content" style="--delay: {i * 3000}ms;">
			{#each 'styxtype - a libre font collection'.split('') as char, i}
				<span style="--index: {i};">{char}</span>
			{/each}
		</p>
	{/each}
</div>

<style>
	.screensaver {
		position: fixed;
		background-color: rgba(0, 0, 0, 0.13);
		width: 100dvw;
		height: 100dvh;
		z-index: 255;
		pointer-events: none;
		top: 0;
		display: none;
		background-color: rgba(0, 0, 0, 0.4);
		color: whitesmoke;
	}

	.screensaver.showing {
		display: block;
		& > p > span {
			animation-play-state: running;
		}
	}

	span {
		position: absolute;
		top: -15%;
		left: 0%;
		font-size: 2rem;
		/* Optimization hacks */
		transform: translate3d(0, 0, 0);
		backface-visibility: hidden;
		perspective: 1000;
		will-change: offset-distance;
		/*  */
		--offset: calc(var(--index) * 1rem);
		offset-distance: calc(var(--offset) - 25dvw);
		offset-path: path(
			'M.36,513.53s259.11,275,615.37-160.06c275.98-337.02,826.06-205.57,594.65,10.7-99.61,93.09-449.38,172.76-510.99,337.82-77.62,207.96,88.97,318.26,296.25,318.26,288.48,0,291.07-398.68,790.42-388.11,209.12,4.43,376.14,133.43,376.14,133.43'
		);
		animation-play-state: paused;
		animation: move 10s infinite forwards var(--delay, 0ms);
	}

	@keyframes move {
		100% {
			offset-distance: calc(var(--offset) + 200dvw);
		}
	}

	/* Pause animation when reduced-motion is set */
	@media (prefers-reduced-motion: reduce) or (update: slow) {
		span {
			offset-distance: calc(var(--offset) + 50dvw);
			animation-play-state: paused !important;
		}
	}
</style>
