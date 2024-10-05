<script lang="ts">
	import '@fontsource/bagnard';
	import { title } from './data';
	// https://fontsource.org/fonts/bagnard/install
	// https://open-foundry.com/fonts/bagnard_regular
</script>

<div class="preview noise" style="view-transition-name: font-preview-{title}">
	<a href="/fonts/Bagnard">
		<h3 style="view-transition-name: font-title-{title}">{title}</h3>
	</a>
	<p>
		<em><a href="https://github.com/sebsan/Bagnard">Bagnard</a></em> by
		<em>Sebastien Sanfilippo</em> was inspired by the graffitis of an anonymous prisoner of the napoleonic
		wars.
	</p>
	<p></p>
</div>

<style>
	.preview {
		font-family: 'Bagnard', 'Wingdings';
		color: #f7ccb9;

		--background: #423350;
	}

	a:hover {
		color: #f7bae4;
	}
</style>
