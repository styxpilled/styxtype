<script lang="ts">
	type Props = {
		label: string;
		checked: boolean;
	};

	let { label, checked = $bindable() }: Props = $props();
</script>

<label>
	<span>{label}</span>
	<input type="checkbox" role="switch" bind:checked />
</label>

<style>
	label {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: var(--space-3);
		font-size: var(--text-sm);
		cursor: pointer;
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
