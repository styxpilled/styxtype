<script lang="ts">
	import '@fontsource/bagnard';
	// https://fontsource.org/fonts/bagnard/install
	// https://open-foundry.com/fonts/bagnard_regular
</script>

<div class="preview noise">
	<h3>Bagnard</h3>
	<p>
		<em><a href="https://github.com/sebsan/Bagnard">Bagnard</a></em> by
		<em>Sebastien Sanfilippo</em> was inspired by the graffitis of an anonymous prisoner of the napoleonic
		wars.
	</p>
	<p></p>
</div>

<style>
	.preview {
		display: flex;
		flex-direction: column;
		align-items: center;

		font-family: 'Bagnard', 'Wingdings';
		color: #f7ccb9;

		--background: #423350;
		border-radius: 1rem;
		border: 2px solid var(--background);
		font-size: 1.5rem;

		& > * {
			text-align: center;
		}
	}

	h3 {
		font-size: 8rem;
	}

	p {
		max-width: 50dvw;
	}

	a:hover {
		color: #c83737;
	}
</style>
