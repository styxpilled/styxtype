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
	<div class="marquee">
		{#each { length: 5 } as _, i}
			<p class="marquee-content">styxtype - a libre font collection</p>
		{/each}
	</div>
	<div class="marquee">
		{#each { length: 5 } as _, i}
			<p class="marquee-content">styxtype - a libre font collection</p>
		{/each}
	</div>
</div>

<style>
	.screensaver {
		position: fixed;
		background-color: rgba(0, 0, 0, 0.13);
		width: 100dvw;
		height: 115dvh;
		top: -5dvh;
		z-index: 255;
		pointer-events: none;
		opacity: 0;

		transition:
			opacity 250ms linear,
			height 250ms linear,
			top 250ms linear;
	}

	.screensaver.showing {
		opacity: 1;
		height: 100dvh;
		top: 0;
	}

	.marquee {
		--gap: 20vw;
		position: relative;
		display: flex;
		overflow: hidden;
		user-select: none;
		gap: var(--gap);
		font-size: 2rem;
		color: whitesmoke;
		background-color: rgba(0, 0, 0, 0.4);
	}

	.marquee-content {
		flex-shrink: 0;
		display: flex;
		justify-content: space-around;
		gap: var(--gap);
	}

	@keyframes scroll {
		from {
			transform: translateX(0);
		}
		to {
			transform: translateX(calc(-100% - var(--gap)));
		}
	}

	/* Pause animation when reduced-motion is set */
	@media (prefers-reduced-motion: reduce) {
		.marquee-content {
			animation-play-state: paused !important;
		}
	}

	.marquee-content {
		animation: scroll 3s linear infinite;
	}
</style>
