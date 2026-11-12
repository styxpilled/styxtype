<script lang="ts" module>
	import { SvelteSet } from 'svelte/reactivity';

	// Module state, so sections stay collapsed when the font changes.
	const collapsed = new SvelteSet<string>();
</script>

<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = { title: string; action?: Snippet; children: Snippet };
	let { title, action, children }: Props = $props();

	let open = $derived(!collapsed.has(title));
	const id = $props.id();
</script>

<section>
	<div class="head">
		<h3>
			<button
				aria-expanded={open}
				aria-controls={id}
				onclick={() => (open ? collapsed.add(title) : collapsed.delete(title))}
			>
				<svg viewBox="0 0 10 10" aria-hidden="true"><path d="M3 2l4 3-4 3" /></svg>
				{title}
			</button>
		</h3>
		{#if open}{@render action?.()}{/if}
	</div>
	{#if open}
		<div class="body" {id}>
			{@render children()}
		</div>
	{/if}
</section>

<style>
	section {
		display: grid;
		gap: var(--space-3);
	}

	.head {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
	}

	button {
		display: flex;
		align-items: center;
		gap: var(--space-1);
		padding: 0;
		border: 0;
		background: none;
		font-size: var(--text-sm);
		font-weight: 600;
		cursor: pointer;
	}

	svg {
		width: 0.625rem;
		height: 0.625rem;
		fill: none;
		stroke: var(--text-muted);
		stroke-width: 1.5;
		stroke-linecap: round;
		stroke-linejoin: round;
		transition: rotate var(--duration);

		[aria-expanded='true'] > & {
			rotate: 90deg;
		}
	}

	.body {
		display: grid;
		gap: var(--space-3);
	}
</style>
