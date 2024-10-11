<script lang="ts">
	import type { Setting } from '$lib/types';

	let {
		settings = $bindable()
	}: {
		settings: Setting[];
	} = $props();
</script>

<div class="row">
	{#each settings as setting}
		<label>
			<span>{setting.label}</span>
			<input type="checkbox" bind:checked={setting.checked} />
		</label>
	{/each}
</div>

<style>
	input[type='checkbox'] {
		width: 0;
		visibility: hidden;
	}

	label {
		user-select: none;
		color: var(--background, white);
		filter: brightness(0.8);
		background-color: #00000088;
		padding: 0 0.5rem;
		border-radius: 1rem;

		&:has(input:checked) {
			filter: brightness(1.1);
		}
	}
</style>
