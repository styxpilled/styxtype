<svelte:head>
	<link rel="stylesheet" href="/font-source/Gulax/index.css" />
</svelte:head>

<!-- https://velvetyne.fr/fonts/gulax/ -->

<div class="preview">
	<div class="title">
		<h3>Gulax</h3>
	</div>
	<p>Experimental monolinear sans by Morgan Gilbert, with the contribution of Anton Moglia.</p>
</div>

<style>
	.preview {
		font-family: 'Gulax', 'Wingdings';
		color: black;
		background-color: white;
	}

	.title {
		display: block;
		text-transform: uppercase;
		background-color: #fe504d;
		line-height: 1;
		height: 6rem;
		position: relative;
		z-index: 5;
		box-shadow:
			8px -8px #c1001d,
			-8px 8px #fd9a00;
	}

	.title::before {
		position: absolute;
		content: 'GUL';
		color: transparent;
		background-color: #02b7ca;
		height: 6rem;
		top: calc(0.75rem - 1px);
		left: calc(3.1ch + 2px);
		font-size: 8rem;
		z-index: 1;
	}

	.title::after {
		position: absolute;
		content: 'AX';
		color: transparent;
		background-color: #ffc700;
		height: 6rem;
		top: -0.5rem;
		left: -1ch;
		font-size: 8rem;
		z-index: 1;
	}

	h3 {
		position: relative;
		z-index: 5;
		display: block;
		margin-top: -2rem;
	}

	h3::before {
		position: absolute;
		content: '';
		color: transparent;
		background-color: #34b828;
		height: 6rem;
		width: 0.6ch;
		top: 1.5rem;
		left: 0.9ch;
		border-bottom-left-radius: 4rem;
		border-bottom-right-radius: 4rem;
		font-size: 8rem;
		z-index: -1;
	}
</style>
