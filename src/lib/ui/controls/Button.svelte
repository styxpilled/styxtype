<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLButtonAttributes } from 'svelte/elements';

	type Props = HTMLButtonAttributes & {
		variant?: 'default' | 'ghost';
		children: Snippet;
	};

	let { variant = 'default', type = 'button', children, ...rest }: Props = $props();
</script>

<button {type} class={variant} {...rest}>{@render children()}</button>

<style>
	button {
		display: inline-flex;
		align-items: center;
		gap: var(--space-2);
		height: 2rem;
		padding: 0 var(--space-3);
		border: 1px solid transparent;
		border-radius: var(--radius-control);
		background: none;
		font-size: var(--text-sm);
		font-weight: 500;
		cursor: pointer;
		transition:
			background-color var(--duration),
			border-color var(--duration);
	}

	.default {
		background: var(--surface-2);
		border-color: var(--border);

		&:hover {
			border-color: var(--border-strong);
		}
	}

	.ghost {
		color: var(--text-muted);

		&:hover {
			color: var(--text);
			background: var(--surface-2);
		}
	}

	button:disabled {
		opacity: 0.5;
		cursor: default;
	}
</style>
