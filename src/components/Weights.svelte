<script lang="ts">
	import type { Weight } from '$lib/types';

	let {
		weights
	}: {
		weights: Weight[];
	} = $props();
</script>

<div>
	<ol>
		{#each weights as weight}
			<li>
				<p>{weight.label} {weight.value}</p>
			</li>
		{/each}
	</ol>
</div>

<style>
	li {
		font-size: 4rem;
	}
</style>
