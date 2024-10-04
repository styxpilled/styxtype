<script lang="ts">
	let {
		characters
	}: {
		characters: string;
	} = $props();
</script>

<div>
	<ol>
		{#each characters.split('') as character}
			<li>{character}</li>
		{/each}
	</ol>
</div>

<style>
	div {
		background-color: black;
		border-radius: 1rem;
		color: white;
		padding: 1rem;
	}

	ol {
		display: flex;
		flex-wrap: wrap;
	}

	li {
		font-size: 4rem;
	}
</style>
