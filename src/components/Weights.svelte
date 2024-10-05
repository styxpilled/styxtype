<script lang="ts">
	import type { Weight } from '$lib/types';

	let {
		weights
	}: {
		weights: Weight[];
	} = $props();
</script>

<div class="flexible">
	<h3>Weights</h3>
	<ol>
		{#each weights as weight}
			<li>
				<p>{weight.label} {weight.value}</p>
			</li>
		{/each}
	</ol>
</div>

<style>
	div {
		padding-left: 1rem;
	}

	li {
		font-size: 4rem;
	}
</style>
