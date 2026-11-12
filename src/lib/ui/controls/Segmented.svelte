<script lang="ts" generics="T extends string">
	type Props = {
		label: string;
		options: { value: T; label: string }[];
		value: T;
		onchange?: (value: T) => void;
	};

	let { label, options, value = $bindable(), onchange }: Props = $props();

	const name = $props.id();
</script>

<div class="segmented" role="radiogroup" aria-label={label}>
	{#each options as option (option.value)}
		<label>
			<input
				type="radio"
				{name}
				value={option.value}
				checked={value === option.value}
				onchange={() => {
					value = option.value;
					onchange?.(option.value);
				}}
			/>
			<span>{option.label}</span>
		</label>
	{/each}
</div>

<style>
	/* Also inside specimen text, which sets its own font. */
	.segmented {
		font-family: var(--font-ui);
		display: inline-flex;
		padding: 2px;
		border-radius: var(--radius-control);
		background: var(--surface-2);
		border: 1px solid var(--border);
	}

	label {
		position: relative;
		cursor: pointer;
	}

	input {
		position: absolute;
		opacity: 0;
		pointer-events: none;
	}

	span {
		display: block;
		padding: var(--space-1) var(--space-3);
		border-radius: calc(var(--radius-control) - 2px);
		font-size: var(--text-sm);
		color: var(--text-muted);
		transition:
			color var(--duration),
			background-color var(--duration);
	}

	label:hover span {
		color: var(--text);
	}

	input:checked + span {
		color: var(--text);
		background: var(--surface);
		box-shadow: var(--shadow-control);
	}

	input:focus-visible + span {
		outline: 2px solid var(--accent);
		outline-offset: 1px;
	}
</style>
