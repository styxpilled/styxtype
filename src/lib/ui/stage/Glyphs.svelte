<script lang="ts">
	type Props = { charset: [number, number][] | undefined };
	let { charset }: Props = $props();

	// Control, format and space characters have nothing to show.
	const invisible = /[\p{C}\p{Z}]/u;

	let chars = $derived.by(() => {
		const result: { char: string; code: string }[] = [];
		for (const [start, end] of charset ?? []) {
			for (let cp = start; cp <= end; cp++) {
				const char = String.fromCodePoint(cp);
				if (invisible.test(char)) continue;
				result.push({ char, code: cp.toString(16).toUpperCase().padStart(4, '0') });
			}
		}
		return result;
	});
</script>

{#if charset}
	<p class="count label num">{chars.length} characters</p>
	<ul class="grid">
		{#each chars as { char, code } (code)}
			<li title="U+{code}">{char}</li>
		{/each}
	</ul>
{/if}

<style>
	.count {
		font-family: var(--font-ui);
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

	li {
		display: grid;
		place-items: center;
		aspect-ratio: 1;
		background: var(--surface);
		font-size: 1.75rem;
		line-height: 1;
		color: var(--ink);

		&:hover {
			background: var(--surface-2);
		}
	}
</style>
