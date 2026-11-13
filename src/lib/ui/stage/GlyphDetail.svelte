<script lang="ts">
	import type { FontMeta, GlyphData } from '#lib/catalog.ts';
	import { describe } from '#lib/features.ts';
	import { descriptors } from '#lib/fonts.svelte.ts';

	type Alternate = { tag: string; n: number };

	type Props = {
		family: string;
		meta: FontMeta;
		data: GlyphData;
		/** Index into `meta.faces` and `data.faces`. */
		face: number;
		cp: number;
		/** Index of `cp` in the expanded charset. */
		index: number;
		alternate: Alternate | null;
		onclose: () => void;
	};

	let { family, meta, data, face, cp, index, alternate = $bindable(), onclose }: Props = $props();

	let char = $derived(String.fromCodePoint(cp));
	let code = $derived(cp.toString(16).toUpperCase().padStart(4, '0'));

	let style = $derived.by(() => {
		const f = meta.faces[face];
		const location = data.locations[face];
		return {
			weight: location?.wght ?? (typeof f.weight === 'number' ? f.weight : 400),
			style: f.italic ? 'italic' : 'normal',
			stretch: location?.wdth !== undefined ? `${location.wdth}%` : descriptors(f).stretch,
			variation: location
				? Object.entries(location)
						.map(([tag, value]) => `"${tag}" ${value}`)
						.join(', ')
				: 'normal'
		};
	});

	let alternates = $derived(
		Object.entries(data.alternates[cp] ?? {}).flatMap(([tag, indexes]) =>
			indexes.map((glyph, i) => ({
				tag,
				n: i + 1,
				glyph,
				name: describe(tag, meta.feature_names)?.name ?? tag
			}))
		)
	);

	let current = $derived(
		alternates.find((a) => a.tag === alternate?.tag && a.n === alternate?.n) ?? null
	);
	let features = $derived(current ? `"${current.tag}" ${current.n}` : 'normal');

	let values = $derived.by(() => {
		const glyph = current?.glyph ?? index;
		const [advance, lsb, rsb] = data.faces[face].slice(glyph * 3, glyph * 3 + 3);
		return { advance, lsb, rsb };
	});

	let width = $state(0);
	let size = $derived(Math.round(Math.min(200, Math.max(88, width * 0.32))));
	let scale = $derived(size / meta.metrics.units_per_em);
	let m = $derived(meta.metrics);

	let glyphEl = $state<HTMLElement>();
	let marker = $state<HTMLElement>();
	let baseline = $state(0);
	let origin = $state(0);

	// The marker is a zero-height inline-block, so its top edge is the baseline.
	$effect(() => {
		void [family, size, cp, features, style, values.advance];
		if (!marker || !glyphEl) return;
		const update = () => {
			baseline = marker!.offsetTop;
			origin = glyphEl!.offsetLeft;
		};
		update();
		document.fonts.ready.then(update);
	});

	const y = (units: number) => baseline - units * scale;
	const x = (units: number) => origin + units * scale;

	// Labels on the same side of lines closer than this share one label.
	const minGap = 14;

	// Pairs that can meet (cap height and x-height, baseline and descender) label opposite sides.
	let lines = $derived.by(() => {
		const all = [
			{ name: 'Ascender', value: m.ascender, below: false },
			{ name: 'Cap height', value: m.cap_height, below: false },
			{ name: 'x-height', value: m.x_height, below: true },
			{ name: 'Baseline', value: 0, below: false },
			{ name: 'Descender', value: m.descender, below: true }
		]
			.filter((l): l is { name: string; value: number; below: boolean } => l.value !== null)
			.toSorted((a, b) => b.value - a.value);
		const merged: { label: string; value: number; below: boolean }[] = [];
		for (const l of all) {
			const last = merged.findLast((n) => n.below === l.below);
			if (last && (last.value - l.value) * scale < minGap) last.label += `, ${l.name} ${l.value}`;
			else merged.push({ label: `${l.name} ${l.value}`, value: l.value, below: l.below });
		}
		return merged;
	});

	let box = $derived({
		top: y(Math.max(m.ascender, m.cap_height ?? 0)),
		bottom: y(m.descender)
	});

	let ink = $derived.by(() => {
		const { advance, lsb, rsb } = values;
		if (advance === null || lsb === null || rsb === null) return null;
		return { left: lsb, right: advance - rsb, advance };
	});

	const span = (a: number, b: number) => ({
		left: x(Math.min(a, b)),
		width: Math.abs(b - a) * scale
	});
</script>

<section
	class="detail"
	aria-label="Glyph U+{code}"
	style:font-family={family}
	style:font-weight={style.weight}
	style:font-style={style.style}
	style:font-stretch={style.stretch}
	style:font-variation-settings={style.variation}
>
	<div class="drawing" bind:clientWidth={width}>
		{#each lines as line (line.label)}
			<div
				class="hline"
				class:baseline={line.value === 0}
				class:below={line.below}
				style:top="{y(line.value)}px"
			>
				<span class="ui num">{line.label}</span>
			</div>
		{/each}

		{#if ink}
			{#each [span(0, ink.left), span(ink.right, ink.advance)] as s, i (i)}
				<div
					class="bearing"
					style:left="{s.left}px"
					style:width="{s.width}px"
					style:top="{box.top}px"
					style:height="{box.bottom - box.top}px"
				></div>
			{/each}
			{#each [0, ink.advance] as edge, i (i)}
				<div
					class="vline edge"
					style:left="{x(edge)}px"
					style:top="{box.top}px"
					style:height="{box.bottom - box.top}px"
				></div>
			{/each}
			{#each [ink.left, ink.right] as edge, i (i)}
				<div
					class="vline ink"
					style:left="{x(edge)}px"
					style:top="{box.top}px"
					style:height="{box.bottom - box.top}px"
				></div>
			{/each}
		{/if}

		<p
			style:font-size="{size}px"
			style:line-height={(m.ascender - m.descender) / m.units_per_em}
			style:font-feature-settings={features}
		>
			<span
				class="glyph"
				bind:this={glyphEl}
				style:width={values.advance !== null ? `${values.advance * scale}px` : undefined}
				>{char}</span
			><span class="marker" bind:this={marker}></span>
		</p>
	</div>

	<div class="info">
		<div class="head ui">
			<span class="num">U+{code}</span>
			<button class="close" aria-label="Close glyph" onclick={onclose}>
				<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M4 4l8 8M12 4l-8 8" /></svg>
			</button>
		</div>

		<dl class="values ui num">
			<div>
				<dt>Advance</dt>
				<dd>{values.advance ?? '-'}</dd>
			</div>
			<div>
				<dt>Left bearing</dt>
				<dd>{values.lsb ?? '-'}</dd>
			</div>
			<div>
				<dt>Right bearing</dt>
				<dd>{values.rsb ?? '-'}</dd>
			</div>
			<div>
				<dt>Weight</dt>
				<dd>{style.weight}</dd>
			</div>
		</dl>

		{#if alternates.length}
			<ul class="alts">
				<li>
					<button aria-pressed={!current} onclick={() => (alternate = null)}>
						<span class="alt-glyph">{char}</span>
						<span class="tag ui">Default</span>
					</button>
				</li>
				{#each alternates as a (`${a.tag} ${a.n}`)}
					<li>
						<button
							title={a.name}
							aria-pressed={current === a}
							onclick={() => (alternate = { tag: a.tag, n: a.n })}
						>
							<span class="alt-glyph" style:font-feature-settings={`"${a.tag}" ${a.n}`}>{char}</span
							>
							<span class="tag ui">{a.tag}{a.n > 1 ? ` ${a.n}` : ''}</span>
						</button>
					</li>
				{/each}
			</ul>
		{/if}
	</div>
</section>

<style>
	.detail {
		display: grid;
		grid-template-columns: 1fr 12rem;
		gap: var(--space-4);
		padding-bottom: var(--space-3);
		border-bottom: 1px solid var(--border);
		font-synthesis: none;
		font-optical-sizing: none;
	}

	.drawing,
	.alts {
		user-select: none;
	}

	.drawing {
		--gutter: 7rem;
		position: relative;
		/* Room for the labels above the top line and below the descender. */
		padding-block: var(--space-4);
		color: var(--ink);
	}

	p {
		margin-left: var(--gutter);
		text-align: center;
		white-space: nowrap;
	}

	.glyph {
		display: inline-block;
		text-align: left;
	}

	.marker {
		display: inline-block;
		width: 0;
		height: 0;
	}

	/* Guides sit behind the glyph. The sticky wrapper is the stacking context. */
	.hline,
	.vline,
	.bearing {
		z-index: -1;
	}

	.hline {
		position: absolute;
		inset-inline: 0;
		border-top: 1px dashed var(--guide);

		&.baseline {
			border-top-style: solid;
			border-top-color: var(--accent);
		}

		span {
			position: absolute;
			left: 0;
			bottom: 2px;
			font-size: var(--text-xs);
			line-height: 1;
			white-space: nowrap;
			color: var(--text-muted);
		}

		&.below span {
			top: 2px;
			bottom: auto;
		}
	}

	.vline {
		position: absolute;
		width: 0;

		&.edge {
			border-left: 1px dashed var(--border-strong);
		}

		&.ink {
			border-left: 1px dashed var(--guide);
		}
	}

	.bearing {
		position: absolute;
		background: var(--accent-soft);
	}

	.info {
		display: flex;
		flex-direction: column;
		gap: var(--space-3);
		padding-top: var(--space-2);
		font-size: var(--text-sm);
	}

	.head {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.close {
		display: grid;
		place-items: center;
		width: 1.75rem;
		height: 1.75rem;
		border: 0;
		border-radius: var(--radius-control);
		background: none;
		color: var(--text-muted);
		cursor: pointer;

		&:hover {
			background: var(--surface-2);
			color: var(--text);
		}

		svg {
			width: 0.875rem;
			stroke: currentColor;
			stroke-width: 1.5;
			stroke-linecap: round;
		}
	}

	.values div {
		display: flex;
		justify-content: space-between;
		padding-block: 1px;
	}

	dt {
		color: var(--text-muted);
		white-space: nowrap;
	}

	.alts {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(3rem, 1fr));
		gap: var(--space-1);

		button {
			display: grid;
			justify-items: center;
			width: 100%;
			padding: var(--space-1) 0;
			border: 1px solid var(--border);
			border-radius: var(--radius-chip);
			background: none;
			cursor: pointer;

			&:hover {
				background: var(--surface-2);
			}

			&[aria-pressed='true'] {
				border-color: var(--accent);
				background: var(--accent-soft);
			}
		}
	}

	.alt-glyph {
		font-size: 1.5rem;
		line-height: 1.2;
		color: var(--ink);
	}

	.tag {
		font-size: var(--text-xs);
		color: var(--text-muted);
	}

	@container glyphs (width < 36rem) {
		.detail {
			grid-template-columns: 1fr;
			gap: var(--space-2);
		}

		.drawing {
			--gutter: 5.5rem;
		}

		.info {
			gap: var(--space-2);
			padding-top: 0;
		}

		.values {
			display: grid;
			grid-template-columns: 1fr 1fr;
			column-gap: var(--space-4);
		}

		.alts {
			display: flex;
			overflow-x: auto;

			li {
				flex: 0 0 3rem;
			}
		}
	}
</style>
