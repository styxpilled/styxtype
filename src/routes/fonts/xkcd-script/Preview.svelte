<svelte:head>
	<link rel="stylesheet" href="/font-source/xkcd-script/index.css" />
</svelte:head>

<div class="preview">
	<h3>xkcd-script</h3>
	<p>
		Derived from the handwriting of @randallmunroe, the author of<a href="https://xkcd.com/">xkcd</a
		>. What you see in the comics is actually his handwriting!
	</p>
</div>

<style>
	.preview {
		display: flex;
		flex-direction: column;
		align-items: center;

		font-family: 'xkcd-script', 'Wingdings';
		color: black;
		background-color: white;

		border-radius: 1rem;
		font-size: 1.5rem;

		& > * {
			max-width: 50dvw;
			text-align: center;
		}
	}

	h3 {
		font-size: 8rem;
	}
</style>
