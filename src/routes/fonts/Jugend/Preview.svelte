<script lang="ts">
	import { previews } from '$lib/state.svelte';
</script>

<svelte:head>
	<link rel="stylesheet" href="/font-source/Jugend/index.css" />
</svelte:head>

<div class="preview noise">
	<!-- https://skrr-type.com/jugend -->
	<!-- Benoît Ferran -->
	<h3>{previews.heading || 'JugenD'}</h3>
	<p>
		Jugend is a display monospace family taking its roots in a lettering from the
		Jugendstil/Art-nouveau magazine of the same name, originally published in 1896. From these five
		letters a whole alphabet was extrapolated with alternates for a number of characters. Jugend
		1896 has the same weight as the original lettering whereas Jugend 2021 is a lighter and sharper
		version.
	</p>
</div>

<style>
	.preview {
		font-family: 'Jugend 1896', 'Wingdings';
		--background-gradient: radial-gradient(
				49% 81% at 48% 35%,
				rgba(19, 174, 219, 0.38) 0%,
				rgba(7, 58, 255, 0) 100%
			),
			radial-gradient(75% 75% at 46% 54%, rgba(6, 65, 96, 0.11) 0%, rgba(7, 58, 255, 0.28) 100%),
			radial-gradient(113% 120% at 17% -2%, rgb(235, 186, 93) 0%, rgba(255, 0, 0, 0) 99%),
			radial-gradient(75% 120% at 86% 72%, rgba(31, 26, 36, 0.73) 0%, rgba(0, 0, 0, 0) 50%),
			radial-gradient(142% 91% at 6% 78%, rgb(69, 12, 27) 0%, rgba(255, 0, 0, 0) 99%),
			radial-gradient(142% 91% at 111% 84%, rgb(6, 65, 96) 0%, rgb(27, 59, 115) 100%);
		font-feature-settings:
			'dlig' 0,
			'numr' 0,
			'dnom' 0,
			'tnum',
			'case' 0,
			'zero' 0,
			'frac',
			'sups' 0,
			'subs' 0,
			'cpsp' 0,
			'salt' 0,
			'ss01',
			'ss02' 0,
			'cv01' 0,
			'cv02' 0,
			'cv03' 0,
			'cv04' 0,
			'cv05' 0,
			'cv06' 0,
			'cv07' 0,
			'cv08' 0,
			'cv09' 0,
			'cv10' 0,
			'calt',
			'liga',
			'kern';
	}

	h3 {
		color: #f5d560;
		text-shadow: 0 0 8px #ebba5d;
	}

	p {
		color: #77aeff;
		font-family: var(--font-ui);
	}

	*::selection {
		background-color: #77adff2a;
	}
</style>
