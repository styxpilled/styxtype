<script lang="ts">
	import { app } from '$lib/state.svelte.js';
	import { onMount } from 'svelte';
	import { type Font } from '../../font.js';
	import { fonts } from '../../fonts.js';

	const fontCache: { [key: string]: boolean } = {};
	let searchFilter = $state('');
	const angles = [3, 5, -4, 5, 6, 7, -5, -4, 3, -5];

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

	loadFont(fonts[0]);
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
		.toSorted((a, b) => a.name.localeCompare(b.name)) as font, i}
		{@const rotation = i % 4}
		{@const rot = font.name.toLocaleLowerCase().charCodeAt(3) % 95}
		{@const rot2 = -rot + rotation + 10}
		{@const offset = rot2 > 3 ? 1 : 5}
		<!-- {angles[(rot + rotation) % angles.length]} -->
		<li class="font">
			<div class="preview" style="mask-image: url('/generated/images/{font.name}.png')">
				<button onclick={() => loadFont(font)}>
					<img id={font.name} src="/generated/images/{font.name}.png" alt="" />
				</button>
			</div>
			<div class="info" style:--i={(rot + rotation) % 4}>
				<span
					style="--rotate: {angles[
						(rot + rotation) % angles.length
					]}; --offset: {offset}; color: #954e79;"
					class="bg"
				>
					{font.category}
				</span>
				<span
					style="color: #6cffb1;"
					style:--rotate={angles[(rot - rotation) % angles.length]}
					class="license">{font.license}</span
				>
			</div>
			<!-- <span style="--rotate: {angles[(rot + rotation) % angles.length]}; --offset: {offset}"
				>{font.category}</span
			> -->
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
		/* background-color: red; */
		z-index: 5;
		font-size: 2rem;
	}

	#font-search {
		border-radius: 0.5rem;
		padding: 0 0.5rem;
		background: radial-gradient(ellipse at 50% 50%, #2d2b28aa 0%, #0e0e0caa 90%);
		outline: 2px solid #0e0e0c88;
		outline-offset: 2px;
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
		position: relative;
	}

	.info {
		display: flex;
		gap: 1rem;
		margin-top: -1rem;
		margin-left: calc(1rem + 0.25rem * (var(--i) * var(--i)));
	}

	.font span {
		color: white;
		font-size: 1.5rem;
		position: relative;
		/* bottom: calc(-0.1ch); */
		font-weight: bold;
		/* left: calc(100% - 2ch - (0.1ch)); */
		white-space: nowrap;
		padding: 0 0.5rem;
		rotate: calc(1.5deg * var(--rotate));
		display: inline-block;
		transform-origin: top;

		&::before {
			z-index: -1;
			content: 't';
			color: white;
			position: absolute;
			left: 0;
			width: 100%;
			background-color: black;
			transform: skew(-10deg);
			color: black;
		}
	}

	.preview {
		/* background: linear-gradient(
			90deg,
			rgba(42, 123, 155, 1) 0%,
			rgba(87, 199, 133, 1) 50%,
			rgba(237, 221, 83, 1) 100%
		); */
		background: linear-gradient(
			90deg,
			rgb(226, 238, 243) 0%,
			rgb(217, 218, 217) 50%,
			rgb(238, 237, 228) 100%
		);
		/* background: black; */
		width: max-content;
	}
	img {
		visibility: hidden;
	}
</style>
