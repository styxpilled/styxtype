<svelte:head>
	<link rel="stylesheet" href="/font-source/Pilowlava/index.css" />
</svelte:head>

<!-- https://velvetyne.fr/fonts/pilowlava/ -->

<div class="preview">
	<div class="bg">
		<h3>Pilowlava</h3>
		<p>
			Pilowlava seeks a balance between viscous energy and controlled geometry. Inspired by the flow
			of lava, the typeface evokes the psychedelic albums of the late 60's and early 70's. The
			structures of its glyphs are mostly derived from hand-written dynamics, that feed from both
			calligraphic and graffiti references.
		</p>
	</div>
</div>

<style>
	.preview {
		font-family: 'Pilowlava Atome', 'Wingdings';
		color: #ef5924;
		display: flex;
		padding: 0;

		background:
			0% 0% / 100px 100px repeat
				radial-gradient(
					circle farthest-side at 100% 100%,
					#5000e6ff 0% 12.5%,
					#5987fcff 12.5% 25%,
					#4a55f2ff 25% 37.5%,
					#808080ff 37.5% 50%,
					#37383eff 50% 62.5%,
					#4a55f2ff 62.5% 75%,
					#5987fcff 75% 87.5%,
					#5c59fc00 87.5% 100%
				),
			0% 0% / 100px 100px repeat
				radial-gradient(
					circle farthest-side at 0% 0%,
					#5c59fc00 0% 12.5%,
					#5987fcff 12.5% 25%,
					#4a55f2ff 25% 37.5%,
					#37383eff 37.5% 50%,
					#808080ff 50% 62.5%,
					#4a55f2ff 62.5% 75%,
					#5987fcff 75% 87.5%,
					#5000e6ff 87.5% 100%,
					#ffffff00 100% 100%
				),
			linear-gradient(to top, #8000ffff 0%, #004cffff 100%),
			radial-gradient(farthest-corner at 50% 100%, #ff008499 0%, #0084ffff 100%);
		background-blend-mode: screen;

		box-shadow: 0 0 0.5rem 0.5rem #f1f1f1 inset;
	}

	.bg {
		/* background-color: red; */
		backdrop-filter: blur(2px);
		text-align: center;
		display: flex;
		flex-direction: column;
		align-items: center;
		/* : center; */
		padding: 1rem;
		height: 100%;
		width: 100%;
	}

	h3 {
		text-shadow: 2px 2px 1px black;
	}

	p {
		font-family: var(--font-ui);
		max-width: 50dvw;
		color: black;
		border-radius: 1rem;
		padding: 1rem;
	}
</style>
