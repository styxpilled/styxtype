<script lang="ts">
	import { font } from './data';
	import '@fontsource/cookie';
</script>

<div class="preview noise">
	<div class="rel">
		<h3 class="outline">{font.title}</h3>
		<h3 class="title-text">{font.title}</h3>
	</div>
	<p>
		{font.title} by
		{font.author.name}
		{font.description}
	</p>
</div>

<style>
	.preview {
		font-family: 'Cookie', 'Wingdings';
		color: #3d2314;

		--background: #f37658;
	}

	.rel {
		position: relative;
	}

	.outline {
		-webkit-text-stroke: 22px #f0e9cc;
		line-height: 1.2;
		font-size: 10rem;
	}

	.title-text {
		position: absolute;
		top: 0;
		line-height: 1.2;
		color: #3d2314;
		font-size: 10rem;
	}

	p {
		color: #f0e9cc;
		font-weight: 600;
		font-family: var(--font-ui);
	}
</style>
