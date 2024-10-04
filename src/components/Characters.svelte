<script lang="ts">
	let {
		characters
	}: {
		characters: string;
	} = $props();
</script>

<div>
	<h2>Characters</h2>
	<ol>
		{#each characters.split('') as character}
			<li>
				<div class="character">{character}</div>
			</li>
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

	h2 {
		margin-top: 1rem;
		margin-left: 2rem;
	}

	ol {
		display: flex;
		flex-wrap: wrap;
	}

	li {
		font-size: 4rem;
		position: relative;
		cursor: pointer;
	}

	.character {
		height: 7rem;
		width: 7rem;
		text-align: center;
	}

	.character:hover {
		font-family: var(--font-ui);
	}
</style>
