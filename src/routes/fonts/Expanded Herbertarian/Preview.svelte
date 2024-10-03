<svelte:head>
	<link rel="stylesheet" href="/font-source/ExpandedHerbertarian/index.css" />
</svelte:head>

<div class="preview noise">
	<h3>Expanded Herbertarian</h3>
	<p>
		A digitization and expansion of <a
			href="https://fontsinuse.com/uses/43515/the-mystery-of-the-dune-font">Davison Art Nouveau</a
		>, used in covers for the Dune book series by
		<a href="https://www.reddit.com/user/purgruv/">purgruv</a>.
	</p>
</div>

<style>
	.preview {
		display: flex;
		flex-direction: column;
		align-items: center;

		font-family: 'Expanded Herbertarian', 'Wingdings';
		color: #f1a55a;

		--background-gradient: radial-gradient(at left top, #7a2405, #070402);
	}

	h3 {
		background: linear-gradient(135deg, #f1c599 0%, #f1a55a 80%, #f1a55a 100%);
		-webkit-background-clip: text;
		background-clip: text;
		-webkit-text-fill-color: transparent;

		font-size: 6rem;
		line-height: 1;
	}

	p {
		color: #f9d8b5;
	}
</style>
