<script lang="ts">
	import { app } from '$lib/state.svelte.js';
	import { onMount } from 'svelte';
	import { fonts, type Font } from '../../fonts.js';

	const fontCache: { [key: string]: boolean } = {};
	let searchFilter = $state('');

	onMount(() => {
		const fontPromises = [];
		for (const font of fonts) {
			const name = font.name;
			const fontPromise = new FontFace(
				`${name} Subset`,
				`url("/generated/optimized/${name}.woff2"),
        url("/generated/optimized/${name}.woff"),
        url("/generated/optimized/${name}.otf"),
        url("/generated/optimized/${name}.ttf")`
			);
			fontPromises.push(fontPromise.load());
		}
		Promise.all(fontPromises).then((loadedFonts) => {
			loadedFonts.forEach(function (font) {
				document.fonts.add(font);
			});
		});
	});

	const loadFont = (font: Font) => {
		const name = font.name;
		app.activeFont = name;
		app.font = font;
		if (fontCache[name]) return;
		const fontface = new FontFace(
			name,
			`url("/generated/fonts/${name}.woff2"),
        url("/generated/fonts/${name}.woff"),
        url("/generated/fonts/${name}.otf"),
        url("/generated/fonts/${name}.ttf")`
		);
		fontCache[name] = true;
		fontface.load().then((f) => {
			document.fonts.add(f);
		});
	};

	app.activeFont = fonts[0].name;
	app.font = fonts[0];
</script>

<!-- <div id="sidebar"> -->

<ul>
	<div class="search">
		<input
			type="text"
			name="font-search"
			id="font-search"
			placeholder="Search"
			bind:value={searchFilter}
		/>
	</div>
	{#each fonts
		.filter((f) => f.name.toLowerCase().includes(searchFilter))
		.toSorted((a, b) => a.name.localeCompare(b.name)) as font}
		<li class="font">
			<div class="preview" style="mask-image: url('/generated/images/{font.name}.png')">
				<button onclick={() => loadFont(font)}>
					<img id={font.name} src="/generated/images/{font.name}.png" alt="" />
				</button>
			</div>
		</li>
	{:else}
		<li>Nothing here!</li>
	{/each}
</ul>

<!-- </div> -->

<style>
	/* div {
		width: max-content;
		max-width: 30vw;
		height: auto;
		max-height: auto;
		outline: 2px solid red;
		outline-offset: -2px;
		overflow-x: hidden;
	} */

	.search {
		position: sticky;
		top: 0;
		padding: 0.5rem;
		width: 100%;
		height: min-content;
		background-color: red;
		z-index: 5;
		font-size: 2rem;
	}

	ul {
		position: relative;
		display: flex;
		flex-direction: column;
		/* flex-wrap: wrap; */
		width: 33vw;
		max-width: 33vw;
		min-height: calc(100vh - 4.5rem);
		height: auto;
		align-items: flex-start;
		gap: 0;
		justify-content: flex-start;
		/* min-height: 100%; */
		overflow-y: scroll;
		overflow-x: hidden;
	}

	.font {
		/* border: 2px solid red; */
		width: min-content;
	}

	.preview {
		background: linear-gradient(
			90deg,
			rgba(42, 123, 155, 1) 0%,
			rgba(87, 199, 133, 1) 50%,
			rgba(237, 221, 83, 1) 100%
		);
		background: black;
		width: max-content;
	}
	img {
		visibility: hidden;
	}
</style>
