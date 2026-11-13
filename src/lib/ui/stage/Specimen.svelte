<script lang="ts" module>
	import texts from '#lib/texts.json';

	// Module state, so an edit stays when the view or font changes.
	let edited = $state<string | null>(null);
</script>

<script lang="ts">
	import type { Metrics } from '#lib/catalog.ts';
	import MetricSpecimen from '#lib/ui/MetricSpecimen.svelte';

	/** `text`: the font's own hero text. A user edit replaces it for all fonts. */
	type Props = { family: string; metrics: Metrics | undefined; text: string | null | undefined };
	let { family, metrics, text }: Props = $props();

	const sizes = [72, 48, 32, 24, 18, 14];

	let width = $state(0);
	let heroSize = $derived(Math.round(Math.min(144, Math.max(56, width * 0.13))));
</script>

<div class="sheet" bind:clientWidth={width}>
	<!-- Keeps its height while the metrics load, so the page does not shift. -->
	<section class="hero" style:min-height="{heroSize * 1.6}px">
		{#if metrics}
			<MetricSpecimen
				{family}
				{metrics}
				bind:text={() => edited ?? text ?? 'Hamburgefonstiv', (v) => (edited = v)}
				size={heroSize}
				editable
			/>
		{/if}
	</section>

	<section class="alphabet">
		{#each texts.alphabet as line (line)}
			<p>{line}</p>
		{/each}
	</section>

	<section aria-label="Pangrams">
		{#each sizes as size, i (size)}
			<div class="row">
				<span class="size ui num">{size}</span>
				<p class="line" style:font-size="{size}px">{texts.pangrams[i]}</p>
			</div>
		{/each}
	</section>

	<section class="marks" aria-label="Figures and punctuation">
		{#each [...texts.figures, ...texts.punctuation] as line (line)}
			<p>{line}</p>
		{/each}
	</section>
</div>

<style>
	.sheet {
		--size-col: 2.5rem;
		display: grid;
		/* Without minmax, nowrap lines make the column wider than the stage. */
		grid-template-columns: minmax(0, 1fr);
		gap: var(--space-5);
		padding: 0 var(--space-3) var(--space-5);
		color: var(--ink);
	}

	section + section {
		padding-top: var(--space-4);
		border-top: 1px solid var(--border);
	}

	.alphabet p {
		font-size: 2.5rem;
		line-height: 1.3;
		overflow-wrap: anywhere;
	}

	.row {
		display: grid;
		grid-template-columns: var(--size-col) minmax(0, 1fr);
		align-items: baseline;
	}

	.size {
		font-size: var(--text-xs);
		color: var(--text-faint);
	}

	/* Long lines scroll. The padding keeps tall glyphs from being clipped. */
	.line {
		line-height: 1.35;
		white-space: nowrap;
		overflow: auto hidden;
		scrollbar-width: none;
		padding-block: 0.25em;
		margin-block: -0.25em;
	}

	.marks p {
		font-size: 2rem;
		line-height: 1.5;
		word-spacing: 0.15em;
	}
</style>
