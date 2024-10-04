<script lang="ts">
	import '@fontsource/young-serif';
</script>

<div class="preview noise">
	<h3>Young Serif</h3>
	<p>
		<a href="https://github.com/noirblancrouge/YoungSerif"><em>Young Serif</em></a> by the
		<a href="https://noirblancrouge.com/"><em>NoirBlancRouge</em></a> foundry is a heavy weight old style
		serif typeface, taking inspiration from Plantin Infant or ITC Italian Old Style. The lowercase 'b'
		and 'f' feature rounded curves, adding a tender and generous quality to this font.
	</p>
	<p></p>
</div>

<style>
	.preview {
		font-family: 'Young Serif', 'Wingdings';
		color: #fbcea0;
		--background: #211c16;
	}

	h3 {
		background: url('/noise2.png'),
			linear-gradient(
				135deg,
				#fbcea0 0%,
				#fbcea0 20%,
				#fbcfa0 40%,
				#fff 60%,
				#fbcfa0 80%,
				#fbcfa0 100%
			),
			url('/noise2.png');

		background-blend-mode: overlay;
		-webkit-background-clip: text;
		background-clip: text;
		-webkit-text-fill-color: transparent;
		background-position: 0%, 0%;
		background-size: 256px, 300%;
		background-repeat: repeat;

		padding: 0 0.5ch;
		transition: background-position 0.5s linear;

		&:hover {
			background-position: 0%, 100%, 0%;
		}
	}

	a {
		transition: color 0.5s ease-in-out;
	}

	a:hover {
		background-position: 0%;
		color: white;
	}
</style>
