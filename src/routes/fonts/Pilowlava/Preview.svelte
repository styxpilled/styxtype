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
		--size: 128px;

		--c1: #ed1d78;
		--c2: #f9ae39;
		--c3: #ef5924;
		--c4: #642c91;

		background:
			radial-gradient(
				var(--size) at 100% 0,
				var(--c4) 6.25%,
				var(--c2) 6.3% 18.75%,
				var(--c1) 18.8% 31.25%,
				var(--c2) 31.3% 43.75%,
				var(--c1) 43.8% 56.25%,
				var(--c2) 56.3% 68.75%,
				#0000 0
			),
			radial-gradient(
				var(--size) at 0 0,
				var(--c4) 6.25%,
				var(--c2) 6.3% 18.75%,
				var(--c1) 18.8% 31.25%,
				var(--c2) 31.3% 43.75%,
				var(--c1) 43.8% 56.25%,
				var(--c2) 56.3% 68.75%,
				#0000 0
			),
			radial-gradient(
				var(--size) at 0 100%,
				var(--c4) 6.25%,
				var(--c2) 6.3% 18.75%,
				var(--c1) 18.8% 31.25%,
				var(--c2) 31.3% 43.75%,
				var(--c1) 43.8% 56.25%,
				var(--c2) 56.3% 68.75%,
				#0000 0
			),
			radial-gradient(
					var(--size) at 100% 100%,
					var(--c4) 6.25%,
					var(--c2) 6.3% 18.75%,
					var(--c1) 18.8% 31.25%,
					var(--c2) 31.3% 43.75%,
					var(--c4) 43.8% 56.25%,
					var(--c2) 56.3% 68.75%,
					#0000 0
				)
				var(--c1);
		background-size: var(--size) var(--size);
		background-color: var(--c1);
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
