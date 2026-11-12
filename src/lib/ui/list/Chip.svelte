<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = {
		pressed: boolean;
		onclick: () => void;
		children: Snippet;
	};

	let { pressed, onclick, children }: Props = $props();
</script>

<button aria-pressed={pressed} {onclick}>{@render children()}</button>

<style>
	button {
		height: 1.625rem;
		padding: 0 var(--space-2);
		border: 1px solid var(--border);
		border-radius: var(--radius-chip);
		background: none;
		font-size: var(--text-xs);
		font-weight: 500;
		color: var(--text-muted);
		cursor: pointer;
		transition:
			color var(--duration),
			border-color var(--duration),
			background-color var(--duration);

		&:hover {
			color: var(--text);
			border-color: var(--border-strong);
		}

		&[aria-pressed='true'] {
			color: var(--accent);
			border-color: var(--accent);
			background: var(--accent-soft);
		}
	}
</style>
