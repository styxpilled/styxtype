<script lang="ts">
	let weight = $state(600);
	const min = 100;
	const max = 500;
	const step = 100;
</script>

<svelte:head>
	<link rel="stylesheet" href="/font-source/Westgate/index.css" />
</svelte:head>

<!-- https://republi.sh/#westgate/info -->

<div class="preview" style:font-weight={weight}>
	<h3>Westgate</h3>
	<p>
		Westgate was designed based on the vernacular concrete typography on the North, East and West
		gates of Saigon's iconic Ben Thanh Market. The typeface carries an elegant condensed form
		inspired by the Art Deco style of the early 20th century French colonial era. It features
		elongated letter heights, combined with geometric lines and forms. The most charming feature is
		the Vietnamese diacritics which are harmoniously integrated into the letterforms, thus
		compensating for the typographic challenges of the Vietnamese language system while not
		compromising legibility.
	</p>
	<label>
		<span class="label">Weight:</span><span>{weight}</span>
		<input type="range" bind:value={weight} {min} {max} {step} />
	</label>
</div>

<style>
	.preview {
		font-family: 'Westgate', 'Wingdings';
		color: #0d9e8f;
		background-color: #ffd243;
	}

	p {
		font-family: var(--font-ui);
	}

	*::selection {
		background-color: #0d9e8f;
		color: #ffd243;
	}
</style>
