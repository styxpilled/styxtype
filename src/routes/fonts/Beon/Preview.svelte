<script lang="ts">
	import { formatDescription } from '$lib';
	import { previews } from '$lib/state.svelte';
	import { font } from './data';
</script>

<svelte:head>
	<link rel="stylesheet" href="/font-source/Beon/index.css" />
</svelte:head>

<div class="preview">
	<h3>«{previews.heading || font.title}»</h3>
	<p>
		{@html formatDescription(font)}
	</p>
</div>

<style>
	.preview {
		font-family: 'Beon', 'Wingdings';
		color: whitesmoke;
		background-color: black;
	}

	h3 {
		animation: flicker 5s infinite alternate;
	}

	@keyframes flicker {
		0%,
		18%,
		22%,
		25%,
		53%,
		57%,
		100% {
			text-shadow:
				0 0 4px #fff,
				0 0 11px #fff,
				0 0 19px #fff,
				0 0 40px #0fa,
				0 0 80px #0fa,
				0 0 90px #0fa,
				0 0 100px #0fa,
				0 0 150px #0fa;
		}
		20%,
		24%,
		55% {
			text-shadow: none;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		h3 {
			animation: none;
		}
	}
</style>
