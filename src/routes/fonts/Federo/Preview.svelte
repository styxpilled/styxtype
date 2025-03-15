<script lang="ts">
	import { previews } from '$lib/state.svelte';
	import '@fontsource/federo';
</script>

<div class="preview noise">
	<h3>{previews.heading || 'Federo'}</h3>
	<p>
		<a href="https://github.com/cyrealtype/Federo">Federo</a> by Olexa Volochay is a display webfont
		that references Jakob Erbar's Feder Grotesk. The goal was to keep the typeface as close as possible
		to the original 1909 design while adapting it for crisp web typography.
	</p>
</div>

<style>
	.preview {
		font-family: 'Federo', 'Wingdings';
		color: #f1ac68;
		--background-gradient: radial-gradient(49% 81% at 45% 47%, #ffe20345 0%, #073aff00 100%),
			radial-gradient(121% 91% at 31% -30%, #2a262d 1%, #ff000000 99%),
			radial-gradient(100% 80% at 99% 49%, #001937 1%, #00000000 28%, #ff000000 99%),
			radial-gradient(142% 91% at -6% 74%, #001937, #00000000 99%),
			radial-gradient(20% 11% at 10% 84%, #001937, #01090fff 100%);
	}

	h3 {
		text-transform: uppercase;
		font-size: 6rem;

		background: linear-gradient(#f1f4c5, #d68231, #101e25);
		/* filter: drop-shadow(2px 2px 5px rgba(255, 255, 255, 0.368))
			drop-shadow(-2px -2px 2px rgba(255, 255, 255, 0.339)); */
		-webkit-background-clip: text;
		background-clip: text;
		-webkit-text-fill-color: transparent;
	}

	h3::first-letter {
		font-size: 8rem;
	}
</style>
