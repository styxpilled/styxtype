<script lang="ts">
	import { previews } from '$lib/state.svelte';

	let weight = $state(80);
	let min = 40;
	let max = 120;
	let shwish = $state(0);
	const swishMin = 0;
	const swishMax = 100;
</script>

<svelte:head>
	<link rel="stylesheet" href="/font-source/Jabin/index.css" />
</svelte:head>

<div class="preview noise" style="font-variation-settings: {`"wght" ${weight}, "XXXX" ${shwish};`}">
	<h3>{previews.heading || 'Jabin'}</h3>
	<p>
		<em><a href="https://www.fridamedrano.com/jabin">Jabin</a></em> by
		<em><a href="https://www.fridamedrano.com">Frida Medrano</a></em> was inspired by George Shelley's
		work on the cover "The Second Part of Natural Scripture" and in the Gutenberg Bible. Both designs
		have lowercase letters overly consistent (almost identical), and the uppercase letters have an exaggerated
		ornamentation, creating a great aesthetic contrast.
	</p>
	<label>
		<span class="label">Weight:</span><span>{weight}</span>
		<input type="range" bind:value={weight} {min} {max} />
	</label>
	<label>
		<span class="label">Swish:</span><span>{shwish}</span>
		<input type="range" bind:value={shwish} min={swishMin} max={swishMax} />
	</label>
</div>

<style>
	.preview {
		font-family: 'https://www.fridamedrano.com/jabin';
		font-family: 'Jabin Typeface', 'Wingdings';
		color: #ffb4b4;
		--background: #080909;
	}

	p {
		font-family: var(--font-ui);
	}

	a:hover {
		color: #c83737;
	}
</style>
