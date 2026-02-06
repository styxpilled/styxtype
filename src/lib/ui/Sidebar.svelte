<script lang="ts">
	import { app } from '$lib/state.svelte.js';
	import { onMount } from 'svelte';
	import { type Font } from '../../font.js';
	import { fonts } from '../../fonts.js';
	import { browser } from '$app/environment';
	import { focus } from '$lib/helpers.js';

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

	app.activeFont = fonts[0].name;
	app.font = fonts[0];
	if (browser) loadFont(fonts[0]);
</script>

<div id="sidebar">
	<div class="search paper">
		<div id="font-search-container">
			<input
				type="text"
				name="font-search"
				id="font-search"
				placeholder="Search"
				bind:value={searchFilter}
			/>
		</div>
	</div>
	<ul>
		{#each fonts
			.filter((f) => f.name.toLowerCase().includes(searchFilter))
			.toSorted((a, b) => a.name.localeCompare(b.name)) as font, i}
			{@const idx = i % 4}
			{@const rot = font.name.toLocaleLowerCase().charCodeAt(3) % 95}
			{@const rot2 = -rot + idx + 10}
			{@const offset = rot2 > 3 ? 1 : 5}
			<!-- {angles[(rot + rotation) % angles.length]} -->
			<li
				class="font"
				class:active={font.name === app.activeFont}
				onmouseenter={(e) => {
					e.currentTarget.classList.add('hover');
				}}
				onmouseleave={(e) => focus(e.target as typeof e.currentTarget)}
			>
				<button
					onclick={() => loadFont(font)}
					onfocus={(e) => {
						e.currentTarget?.parentElement?.classList.add('hover');
					}}
					onblur={(e) => {
						console.log(e);

						focus((e.target as typeof e.currentTarget)?.parentElement as typeof e.currentTarget);
					}}
				>
					<div class="preview" style="mask-image: url('/generated/images/{font.name}.png')">
						<img id="{font.name}-image" src="/generated/images/{font.name}.png" alt="" />
					</div>
				</button>
				<div class="info" style:--i={(rot + idx) % 4}>
					<span
						style="--rotate: {angles[
							(rot + idx) % angles.length
						]}; --offset: {offset}; color: #954e79;"
						class="bg"
					>
						{font.category}
					</span>
					<span
						style="color: #6cffb1;"
						style:--rotate={angles[(rot - idx) % angles.length]}
						class="license">{font.license}</span
					>
				</div>
			</li>
		{:else}
			<li>Nothing here!</li>
		{/each}
	</ul>
</div>

<style>
	.search {
		position: sticky;
		top: 0;
		padding: 0.5rem;
		padding-left: 1rem;
		width: 100%;
		height: min-content;
		/* background-color: red; */
		z-index: 5;
		font-size: 2rem;
		background: linear-gradient(to bottom, #0e0e0c57, transparent);
		color: whitesmoke;
	}

	#font-search {
		border-radius: 0.5rem;
		padding: 0 0.5rem;
		background: radial-gradient(ellipse at 50% 50%, #2d2b28ee 0%, #0e0e0cee 90%);
		backdrop-filter: blur(2px);
		margin: 0.5rem;
	}

	#font-search-container {
		width: min-content;
		position: relative;

		&::after {
			content: '';
			position: absolute;
			height: 100%;
			width: 100%;
			top: 0;
			left: 0;
			border-radius: 0.5rem;
			border: 4px solid #0e0e0caa;
			filter: url(#noise-small) blur(0.65px);
			pointer-events: none;
		}
	}

	div#sidebar {
		height: calc(100vh - 16rem);
	}

	ul {
		position: relative;
		display: flex;
		flex-direction: column;
		width: 33vw;
		max-width: 33vw;
		min-height: calc(100vh - 16rem);
		height: calc(100vh - 9rem);
		align-items: flex-start;
		justify-content: flex-start;
		margin-top: -1rem;
		padding: 1rem 0;
		overflow-y: scroll;
		overflow-x: hidden;
		background: linear-gradient(to right, #110d09, transparent 50%);
	}

	.font {
		/* border: 2px solid red; */
		width: min-content;
		position: relative;
	}

	img {
		/* background-size: 0% 100%; */
		transition: background ease-in-out 100ms;
		/* background-repeat: no-repeat; */
		background: transparent;
		mask: none;
	}

	.font {
		--op: #2b6746;
		--frames: 6;

		&::before {
			content: '';
			position: absolute;
			width: 100%;
			/* height: 100%; */
			height: 72px;
			left: 0.5rem;
			background-repeat: no-repeat;
			background-image: url('/images/reveal-alpha/out.png'), linear-gradient(currentColor);
			background-size: 100% calc(72px * var(--frames));
			mix-blend-mode: screen;
			background-position: 0 72px;
			color: var(--op);
			background-blend-mode: multiply;
			transition: color 200ms ease-in-out;
		}

		:global(&.hover::before),
		&:has(button:focus)::before {
			animation: brush 0.2s steps(calc(var(--frames))) forwards;
		}
	}

	.active {
		&::before {
			animation: brush 0.2s steps(calc(var(--frames))) forwards;
			--op: #6cffb1;
			color: var(--op);
		}

		& .preview {
			background: #1d1515;
		}
	}

	@keyframes brush {
		to {
			background-position: 0 -360px;
		}
	}

	.info {
		display: flex;
		gap: 1rem;
		margin-top: -1rem;
		margin-left: calc(1rem + 0.25rem * (var(--i) * var(--i)));
	}

	.font span {
		color: white;
		color: transparent;
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
			filter: url(#noise-small);
			position: absolute;
			left: 0;
			width: 100%;
			background-color: black;
			transform: skew(-10deg);
			/* transform: skew(-10deg, 1deg) perspective(10px); */
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
		mask-repeat: no-repeat;
		width: max-content;
		min-width: 300px;
	}
	img {
		visibility: hidden;
	}
</style>
