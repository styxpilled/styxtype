<script lang="ts">
	type Props = {
		value: string;
		label: string;
		placeholder?: string;
		input?: HTMLInputElement;
	};

	let { value = $bindable(), label, placeholder, input = $bindable() }: Props = $props();
</script>

<label class="search">
	<span class="visually-hidden">{label}</span>
	<svg viewBox="0 0 16 16" aria-hidden="true">
		<circle cx="7" cy="7" r="4.5" />
		<path d="M10.5 10.5 14 14" />
	</svg>
	<input
		type="search"
		bind:this={input}
		bind:value
		{placeholder}
		autocomplete="off"
		spellcheck="false"
	/>
</label>

<style>
	.search {
		position: relative;
		display: block;
	}

	svg {
		position: absolute;
		top: 50%;
		left: var(--space-3);
		width: 1rem;
		height: 1rem;
		translate: 0 -50%;
		fill: none;
		stroke: var(--text-muted);
		stroke-width: 1.5;
		stroke-linecap: round;
		pointer-events: none;
	}

	input {
		width: 100%;
		height: 2.25rem;
		padding: 0 var(--space-3) 0 calc(var(--space-3) * 2 + 1rem);
		border: 1px solid var(--border);
		border-radius: var(--radius-control);
		background: var(--surface-2);
		font-size: var(--text-md);
		transition: border-color var(--duration);

		&::placeholder {
			color: var(--text-faint);
		}

		&:hover {
			border-color: var(--border-strong);
		}

		&:focus-visible {
			outline-offset: -1px;
			outline-width: 1.5px;
		}
	}

	.visually-hidden {
		position: absolute;
		width: 1px;
		height: 1px;
		overflow: hidden;
		clip-path: inset(50%);
		white-space: nowrap;
	}
</style>
