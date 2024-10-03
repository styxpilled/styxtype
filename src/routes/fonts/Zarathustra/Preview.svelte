<svelte:head>
	<link rel="stylesheet" href="/font-source/Zarathustra/index.css" />
</svelte:head>

<div class="preview noise">
	<h3>Zarathustra</h3>
	<p>
		<a href="https://github.com/lorene-cn/zarathustra-typeface"><em>Zarathustra</em></a> by
		<a href="http://lorene-picard.com/"><em>Lorène Picard</em></a> is a revival of a typeface designed
		by Belgian painter Georges Lemmen at the beggining of the 20th century.
	</p>
</div>

<style>
	.preview {
		display: flex;
		flex-direction: column;
		align-items: center;

		font-family: 'Zarathustra', 'Wingdings';
		color: #58180d;

		--background: white;
		border-radius: 1rem;
		border: 2px solid #f5f5f5;
		font-size: 1.5rem;

		& > * {
			max-width: 50dvw;
			text-align: center;
		}
	}

	h3 {
		font-size: 6rem;
	}
</style>
