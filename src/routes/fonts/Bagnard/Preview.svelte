<script lang="ts">
	import '@fontsource/bagnard';
	import { font } from './data';
	import { formatDescription } from '$lib';
	// https://fontsource.org/fonts/bagnard/install
	// https://open-foundry.com/fonts/bagnard_regular
</script>

<div class="preview noise" style="view-transition-name: font-preview-{font.title}">
	<a href="/fonts/Bagnard">
		<h3 style="view-transition-name: font-title-{font.title}">{font.title}</h3>
	</a>
	<p>
		{@html formatDescription(font)}
	</p>
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
