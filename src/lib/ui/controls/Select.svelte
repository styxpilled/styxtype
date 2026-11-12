<script lang="ts" generics="T extends string">
	type Props = {
		label: string;
		options: { value: T; label: string }[];
		value: T;
		onchange?: (value: T) => void;
	};

	let { label, options, value = $bindable(), onchange }: Props = $props();

	const id = $props.id();
</script>

<div class="select">
	<label for={id}>{label}</label>
	<select {id} bind:value onchange={() => onchange?.(value)}>
		{#each options as option (option.value)}
			<option value={option.value}>{option.label}</option>
		{/each}
	</select>
</div>

<style>
	.select {
		display: grid;
		gap: var(--space-1);
	}

	label {
		font-size: var(--text-sm);
	}

	select {
		height: 2rem;
		padding: 0 var(--space-2);
		border: 1px solid var(--border);
		border-radius: var(--radius-control);
		background: var(--surface);
		font-size: var(--text-sm);
		cursor: pointer;

		&:hover {
			border-color: var(--border-strong);
		}
	}
</style>
