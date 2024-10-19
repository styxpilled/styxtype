<script lang="ts">
	import { formatDescription } from '$lib';

	import { font } from './data';
</script>

<svelte:head>
	<link rel="stylesheet" href="/font-source/Balans/index.css" />
</svelte:head>

<div class="preview">
	<div class="rel">
		<h3>{font.title}</h3>
		<h3 class="line">{font.title}</h3>
	</div>
	<p>
		{@html formatDescription(font)}
	</p>
</div>

<style>
	.preview {
		font-family: 'Balans', 'Wingdings';
		color: white;
		background-color: #003488;
	}

	.rel {
		position: relative;
		height: 1.5ch;
		width: 6ch;
		font-size: 8rem;
	}

	h3 {
		position: absolute;
		top: 0;
		line-height: 1;
		left: calc(50% - 2.5ch);
		filter: blur(0.25px);
		text-rendering: geometricPrecision;
	}

	h3.line {
		font-family: 'Balans Line';
		color: #ed7505;
		text-shadow:
			1px 1px 1px #ed7505,
			-1px 0px 1px #ed7505;
	}

	p {
		font-size: 2rem;
	}
</style>
