<script lang="ts">
	let weight = $state(700);
	let min = 400;
	let max = 900;
</script>

<svelte:head>
	<link rel="stylesheet" href="/font-source/Cooper/index.css" />
</svelte:head>

<div class="preview noise" style:font-weight={weight}>
	<h3>Cooper<span style="color: #743e3e;">*</span></h3>
	<p>
		<em>Cooper*</em> by <em><a href="https://indestructibletype.com">Owen Earl</a></em> is a revival
		of a 1922 font by Oswald Bruce Cooper. The original font is most known for it's iconic
		<em><a href="https://en.wikipedia.org/wiki/Cooper_Black">Cooper Black</a></em> typeface - one you've
		definitely seen. This revival aims to shine some light on the more lightweight variants of the font.
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

		font-family: 'Cooper*', 'Wingdings';
		color: #224d77;

		--background: #f2ecd9;
		border-radius: 1rem;
		border: 2px solid var(--background);
		font-size: 1.5rem;

		& > * {
			max-width: 50dvw;
			text-align: center;
		}
	}

	h3 {
		font-size: 8rem;
	}
</style>
