<script lang="ts">
	import '@fontsource-variable/shantell-sans/full.css';
	let weight = $state(400);
	let min = 100;
	let max = 900;
</script>

<div class="preview" style:font-weight={weight}>
	<h3>Shantell Sans</h3>
	<p>
		Shantell Sans, from Shantell Martin, is a marker-style font built for creative expression,
		typographic play, and animation.
	</p>
	<label>
		<span></span>
		<input type="range" bind:value={weight} {min} {max} step="100" />
	</label>
</div>

<style>
	.preview {
		display: flex;
		flex-direction: column;
		align-items: center;

		font-family: 'Shantell Sans Variable', 'Wingdings';
		color: white;

		background-color: black;
		border-radius: 1rem;
		font-size: 1.5rem;

		& > * {
			max-width: 50dvw;
			text-align: center;
		}
	}

	h3 {
		font-size: 8rem;
		font-variation-settings:
			'opsz' 96,
			'BNCE' 25,
			'INFM' 25;

		animation: bounce 1.5s alternate infinite ease-in-out;
	}

	@keyframes bounce {
		from {
			font-variation-settings: 'BNCE' -50;
		}
		to {
			font-variation-settings: 'BNCE' 50;
		}
	}

	@media (prefers-reduced-motion) {
		h3 {
			animation-play-state: paused !important;
		}
	}
</style>
