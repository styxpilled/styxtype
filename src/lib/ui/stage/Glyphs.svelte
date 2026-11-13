<script lang="ts" module>
	// Module state, so the selection stays when the font or view changes.
	let selected = $state<number | null>(null);
	let alternate = $state<{ tag: string; n: number } | null>(null);
</script>

<script lang="ts">
	import type { Face, FontMeta, GlyphData } from '#lib/catalog.ts';
	import { loadGlyphs } from '#lib/fonts.svelte.ts';
	import { settings } from '#lib/settings.svelte.ts';
	import GlyphDetail from '#lib/ui/stage/GlyphDetail.svelte';
	import { tick } from 'svelte';

	type Props = { family: string; meta: FontMeta | undefined };
	let { family, meta }: Props = $props();

	// Control, format and space characters have nothing to show.
	const invisible = /[\p{C}\p{Z}]/u;

	/** Base letter in lowercase: Á, á and ª all give a. */
	const searchKey = (char: string) =>
		[...char.normalize('NFKD').replace(/\p{M}/gu, '').toLowerCase()][0] ?? char;

	/** `index`: position in the expanded charset, which is the glyph data order. */
	let chars = $derived.by(() => {
		const result: { cp: number; char: string; code: string; key: string; index: number }[] = [];
		let index = 0;
		for (const [start, end] of meta?.charset ?? []) {
			for (let cp = start; cp <= end; cp++, index++) {
				const char = String.fromCodePoint(cp);
				if (invisible.test(char)) continue;
				const code = cp.toString(16).toUpperCase().padStart(4, '0');
				result.push({ cp, char, code, key: searchKey(char), index });
			}
		}
		return result;
	});

	let position = $derived(chars.findIndex((c) => c.cp === selected));

	let loaded = $state<{ slug: string; data: GlyphData }>();
	let data = $derived(loaded?.slug === meta?.slug ? loaded?.data : undefined);

	$effect(() => {
		const slug = meta?.slug;
		if (!slug) return;
		loadGlyphs(slug)
			.then((d) => (loaded = { slug, data: d }))
			.catch(() => {});
	});

	/** The face the browser picks for the current weight and style, close to CSS font matching. */
	function matchFace(faces: Face[], weight: number, italic: boolean): number {
		const pool = faces.some((f) => f.italic === italic) ? italic : !italic;
		const distance = (f: Face) => {
			const [low, high] = Array.isArray(f.weight) ? f.weight : [f.weight, f.weight];
			const off = weight < low ? low - weight : weight > high ? weight - high : 0;
			return (f.italic === pool ? 0 : 1e6) + Math.abs(f.width - 5) * 1e3 + off;
		};
		return faces.reduce((best, f, i) => (distance(f) < distance(faces[best]) ? i : best), 0);
	}

	let face = $derived(
		meta ? matchFace(meta.faces, settings.font.weight ?? 400, settings.font.italic) : 0
	);

	let root = $state<HTMLElement>();
	let grid = $state<HTMLElement>();
	let panel = $state<HTMLElement>();
	let panelHeight = $state(0);

	async function select(cp: number | null) {
		if (cp !== selected) alternate = null;
		selected = cp;
		if (cp === null) return;
		await tick();
		// bind:clientHeight updates too late for a panel that just opened.
		panelHeight = panel?.offsetHeight ?? 0;
		await tick();
		const cell = grid?.querySelector<HTMLElement>(`[data-cp="${cp}"]`);
		cell?.focus({ preventScroll: true });
		cell?.scrollIntoView({ block: 'nearest' });
	}

	let match = $state<string | null>(null);
	let matched: HTMLElement[] = [];

	// Class changes on the matching cells only, not an update of every cell.
	$effect(() => {
		void chars;
		for (const cell of matched) cell.classList.remove('match');
		matched =
			match && grid
				? [...grid.querySelectorAll<HTMLElement>(`[data-key="${CSS.escape(match)}"]`)]
				: [];
		for (const cell of matched) cell.classList.add('match');
	});

	/**
	 * Captured on the window, before the font list and the shell. In this view, arrows and
	 * letters belong to the grid. Slash stays with the font search.
	 */
	function onkeydown(e: KeyboardEvent) {
		if (e.ctrlKey || e.metaKey || e.altKey) return;
		const target = e.target as HTMLElement;
		if (target !== document.body && !root?.contains(target)) return;

		if (e.key === 'Escape') {
			if (match !== null) match = null;
			else if (selected !== null) select(null);
			else return;
			e.stopPropagation();
			return;
		}

		const columns = grid ? getComputedStyle(grid).gridTemplateColumns.split(' ').length : 1;
		const step = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -columns, ArrowDown: columns }[e.key];
		if (step) {
			e.preventDefault();
			e.stopPropagation();
			const focused = Number(target.dataset.cp);
			const from = position >= 0 ? position : chars.findIndex((c) => c.cp === focused);
			const next = from < 0 ? chars[0] : chars[from + step];
			if (next) select(next.cp);
			return;
		}

		if ([...e.key].length === 1 && e.key !== '/' && !/\s/.test(e.key)) {
			e.preventDefault();
			e.stopPropagation();
			const key = searchKey(e.key);
			match = match === key ? null : key;
			tick().then(() => matched[0]?.scrollIntoView({ block: 'nearest' }));
		}
	}

	$effect(() => {
		window.addEventListener('keydown', onkeydown, { capture: true });
		return () => window.removeEventListener('keydown', onkeydown, { capture: true });
	});
</script>

{#if meta}
	<div class="glyphs" bind:this={root} style:--panel="{panelHeight}px">
		{#if data && position >= 0}
			<div class="sticky" bind:this={panel} bind:clientHeight={panelHeight}>
				<GlyphDetail
					{family}
					{meta}
					{data}
					{face}
					cp={chars[position].cp}
					index={chars[position].index}
					bind:alternate
					onclose={() => select(null)}
				/>
			</div>
		{/if}

		<p class="count ui label num">{chars.length} characters</p>
		<ul class="grid" bind:this={grid}>
			{#each chars as { cp, char, code, key } (cp)}
				<li>
					<button
						data-cp={cp}
						data-key={key}
						title="U+{code}"
						aria-pressed={cp === selected}
						onclick={() => select(cp === selected ? null : cp)}>{char}</button
					>
				</li>
			{/each}
		</ul>
	</div>
{/if}

<style>
	.glyphs {
		container: glyphs / inline-size;
	}

	/* Covers the stage body top margin, so the grid does not show above it. */
	.sticky {
		position: sticky;
		top: calc(-1 * var(--stage-margin));
		z-index: 1;
		margin: calc(-1 * var(--stage-margin)) 0 var(--space-4);
		padding-top: var(--stage-margin);
		background: var(--surface);
	}

	.count {
		margin-bottom: var(--space-3);
	}

	/* 1px gaps over a border-colored background draw the cell lines. */
	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(3.5rem, 1fr));
		gap: 1px;
		margin-bottom: var(--space-7);
		border: 1px solid var(--border);
		border-radius: var(--radius-control);
		overflow: hidden;
		background: var(--border);
	}

	button {
		display: grid;
		place-items: center;
		width: 100%;
		aspect-ratio: 1;
		padding: 0;
		border: 0;
		background: var(--surface);
		font-family: inherit;
		font-size: 1.75rem;
		line-height: 1;
		color: var(--ink);
		cursor: pointer;
		scroll-margin-top: calc(var(--panel) + var(--space-2));

		&:hover {
			background: var(--surface-2);
		}

		&[aria-pressed='true'] {
			background: var(--accent-soft);
		}

		&:global(.match) {
			box-shadow: inset 0 0 0 2px var(--accent);
		}

		&:focus-visible {
			outline-offset: -2px;
		}
	}
</style>
