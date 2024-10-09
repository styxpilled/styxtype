<script lang="ts">
	import '@fontsource/calistoga';
	import Bg from './bg.svelte';

	// github.com/SorkinType/Calistoga
	// https://fonts.google.com/specimen/Calistoga
</script>

<div class="preview noise">
	<div class="header-container">
		<h3 class="noise-light">Calistoga</h3>
		<Bg />
		<p>since 1986</p>
	</div>
	<p class="description">
		Calistoga by Yvonne Schuttler is a cheerful, space saving display typeface with vintage US
		railroad flavor. Calistoga includes proportional, tabular, old style and lining figures. It also
		offers fractions, superiors, inferiors, a broad range of symbols, and it includes case sensitive
		forms.
	</p>
</div>

<style>
	.preview {
		font-family: 'Calistoga', 'Wingdings';
		color: #edd8bf;
		--background: #2f2934;
	}

	.header-container {
		position: relative;
		margin-bottom: 1rem;

		& p {
			position: absolute;
			bottom: 1rem;
			left: calc(50% - 4ch);
		}
	}

	h3 {
		position: relative;
		z-index: 5;

		text-transform: uppercase;
		color: #c6baaa;
		--background: #eedbc3;
		background-attachment: local;
		background-clip: text;
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-size: 128px 128px;
	}
</style>
