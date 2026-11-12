<script lang="ts">
	type Props = {
		label: string;
		checked: boolean;
		/** Small code after the label, for example an OpenType tag. */
		tag?: string;
		onchange?: (checked: boolean) => void;
	};

	let { label, checked = $bindable(), tag, onchange }: Props = $props();
</script>

<label>
	<input type="checkbox" role="switch" bind:checked onchange={() => onchange?.(checked)} />
	<span
		>{label}{#if tag}<span class="tag">{tag}</span>{/if}</span
	>
</label>

<style>
	label {
		display: flex;
		align-items: center;
		gap: var(--space-2);
		font-size: var(--text-sm);
		cursor: pointer;
	}

	.tag {
		margin-left: var(--space-2);
		font-size: var(--text-xs);
		color: var(--text-faint);
	}

	input {
		position: relative;
		flex: none;
		width: 1.75rem;
		height: 1rem;
		margin: 0;
		border-radius: var(--radius-full);
		background: var(--border-strong);
		appearance: none;
		cursor: pointer;
		transition: background-color var(--duration);

		&::after {
			content: '';
			position: absolute;
			top: 2px;
			left: 2px;
			width: 0.75rem;
			height: 0.75rem;
			border-radius: var(--radius-full);
			background: var(--surface);
			box-shadow: var(--shadow-control);
			transition: translate var(--duration);
		}

		&:checked {
			background: var(--accent);

			&::after {
				translate: 0.75rem 0;
			}
		}
	}
</style>
