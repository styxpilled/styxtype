<svelte:head>
	<link rel="stylesheet" href="/font-source/Pizius/index.css" />
</svelte:head>

<div class="preview">
	<div class="title">
		<h3 class="fill">Pizius</h3>
		<h3 class="background">Pizius</h3>
	</div>
	<p>
		Pizius by <a href="https://berzulis.com/">Mindaugas Gavrilovas</a> is a display typeface inspired
		by Lithuanian mythology. It features rotated and slanted glyphs, making it look friendly and playful.
	</p>
</div>

<style>
	.preview {
		font-family: 'Pizius', 'Wingdings';
		color: black;
		background-color: rgb(244, 233, 136);
	}

	.title {
		position: relative;
	}

	.fill {
		position: absolute;
		z-index: 5;
		background: linear-gradient(to top, #00ab3c, #69faa8 80%);
		background-clip: text;
		-webkit-text-fill-color: transparent;
	}

	h3.background {
		user-select: none;
		-webkit-text-stroke: 2.25rem white;
		filter: drop-shadow(1rem 0.5rem #00ab3c);
	}

	h3::selection {
		background-color: #a7f9c280;
	}

	p {
		font-family: var(--font-ui);
	}

	*::selection {
		background-color: #4df596aa;
	}
</style>
