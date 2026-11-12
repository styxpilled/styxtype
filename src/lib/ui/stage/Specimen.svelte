<script lang="ts" module>
	import texts from '#lib/texts.json';

	// Module state, so the choice stays when the view changes.
	let excerpt = $state(texts.excerpts[0].id);
	let hero = $state('Hamburgefonstiv');
</script>

<script lang="ts">
	import type { Metrics } from '#lib/catalog.ts';
	import { settings } from '#lib/settings.svelte.ts';
	import Segmented from '#lib/ui/controls/Segmented.svelte';
	import MetricSpecimen from '#lib/ui/MetricSpecimen.svelte';

	type Props = { family: string; metrics: Metrics | undefined };
	let { family, metrics }: Props = $props();

	const sizes = [72, 48, 32, 24, 18, 14];

	let width = $state(0);
	let heroSize = $derived(Math.round(Math.min(144, Math.max(56, width * 0.13))));
	let current = $derived(texts.excerpts.find((e) => e.id === excerpt) ?? texts.excerpts[0]);
</script>

<div class="sheet" bind:clientWidth={width}>
	<section class="hero">
		{#if metrics}
			<MetricSpecimen {family} {metrics} bind:text={hero} size={heroSize} editable />
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
				<span class="size num">{size}</span>
				<p class="line" style:font-size="{size}px">{texts.pangrams[i]}</p>
			</div>
		{/each}
	</section>

	<section class="marks" aria-label="Figures and punctuation">
		{#each [...texts.figures, ...texts.punctuation] as line (line)}
			<p>{line}</p>
		{/each}
	</section>

	<section class="excerpt">
		<Segmented
			label="Excerpt"
			bind:value={excerpt}
			options={texts.excerpts.map((e) => ({ value: e.id, label: e.label }))}
		/>
		<p
			style:font-size="{settings.size}px"
			style:line-height={settings.lineHeight}
			style:letter-spacing="{settings.tracking}em"
		>
			{current.text}
		</p>
	</section>
</div>

<style>
	.sheet {
		--size-col: 2.5rem;
		display: grid;
		/* Without minmax, nowrap lines make the column wider than the stage. */
		grid-template-columns: minmax(0, 1fr);
		gap: var(--space-7);
		padding-bottom: var(--space-7);
		color: var(--ink);
	}

	section + section {
		padding-top: var(--space-6);
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
		font-family: var(--font-ui);
		font-size: var(--text-xs);
		color: var(--text-faint);
	}

	/* Long lines clip with a short fade instead of wrapping. */
	.line {
		overflow: hidden;
		line-height: 1.35;
		white-space: nowrap;
		mask-image: linear-gradient(to left, transparent, #000 1.5rem);
	}

	.marks p {
		font-size: 2rem;
		line-height: 1.5;
		word-spacing: 0.15em;
	}

	.excerpt {
		display: grid;
		justify-items: start;
		gap: var(--space-5);

		p {
			max-width: 36em;
			white-space: pre-line;
			hanging-punctuation: first;
		}
	}
</style>
