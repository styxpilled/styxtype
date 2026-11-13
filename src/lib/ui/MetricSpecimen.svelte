<script lang="ts">
	import type { Metrics } from '#lib/catalog.ts';

	type Props = {
		family: string;
		metrics: Metrics;
		text: string;
		size: number;
		editable?: boolean;
	};

	let { family, metrics, text = $bindable(), size, editable = false }: Props = $props();

	// One line only: the guides are drawn for one baseline.
	function onkeydown(e: KeyboardEvent) {
		if (e.key === 'Enter') e.preventDefault();
	}

	let marker = $state<HTMLElement>();
	let baseline = $state(0);

	// The marker is a zero-height inline-block, so its top edge is the baseline.
	$effect(() => {
		void [family, size, text];
		if (!marker) return;
		const update = () => (baseline = marker!.offsetTop);
		update();
		document.fonts.ready.then(update);
	});

	let scale = $derived(size / metrics.units_per_em);
	// Pairs that can meet (cap height and x-height, baseline and descender) label opposite sides.
	let lines = $derived(
		[
			{ name: 'Cap height', value: metrics.cap_height, below: false },
			{ name: 'x-height', value: metrics.x_height, below: true },
			{ name: 'Baseline', value: 0, below: false },
			{ name: 'Descender', value: metrics.descender, below: true }
		]
			.filter((l): l is { name: string; value: number; below: boolean } => l.value !== null)
			.map((l) => ({ ...l, y: baseline - l.value * scale }))
	);
</script>

<div class="specimen" style:font-family={family} style:font-size="{size}px">
	{#each lines as line (line.name)}
		<div
			class="guide"
			class:baseline={line.value === 0}
			class:below={line.below}
			style:top="{line.y}px"
		>
			<span class="ui num">{line.name} {line.value}</span>
		</div>
	{/each}
	<p>
		{#if editable}<span
				class="edit"
				role="textbox"
				tabindex="0"
				aria-label="Specimen text"
				contenteditable="plaintext-only"
				spellcheck="false"
				bind:textContent={text}
				{onkeydown}
			></span>{:else}{text}{/if}<span class="marker" bind:this={marker}></span>
	</p>
</div>

<style>
	.specimen {
		--gutter: 7.5rem;
		position: relative;
		color: var(--ink);
		line-height: 1.6;
	}

	/* Text starts after the label gutter and clips when it is too long. */
	p {
		position: relative;
		margin-left: var(--gutter);
		overflow: hidden;
		white-space: nowrap;
	}

	.edit {
		outline: none;
	}

	.marker {
		display: inline-block;
		height: 0;
		width: 0;
	}

	.guide {
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
</style>
