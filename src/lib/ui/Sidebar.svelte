<script lang="ts">
	import { app } from '$lib/state.svelte.js';
	import { onMount } from 'svelte';
	import { fonts } from '../../fonts.js';

	const fontCache: { [key: string]: boolean } = {};

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

	const loadFont = (name: string) => {
		app.activeFont = name;
		if (fontCache[name]) return;
		const fontface = new FontFace(
			name,
			`url("/generated/fonts/${name}.woff2"),
        url("/generated/fonts/${name}.woff"),
        url("/generated/fonts/${name}.otf"),
        url("/generated/fonts/${name}.ttf")`
		);
		fontCache[name] = true;
		fontface.load().then((font) => {
			document.fonts.add(font);
		});
	};

	app.activeFont = fonts[0].name;
</script>

<ul>
	{#each fonts.toSorted((a, b) => a.name.localeCompare(b.name)) as font}
		<li class="font">
			<div class="preview" style="mask-image: url('/generated/images/{font.name}.png')">
				<button onclick={() => loadFont(font.name)}>
					<img id={font.name} src="/generated/images/{font.name}.png" alt="" />
				</button>
			</div>
		</li>
	{/each}
</ul>

<style>
	ul {
		display: flex;
		flex-wrap: wrap;
		width: 30vw;
		height: 90vh;
		border: 2px solid red;
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
