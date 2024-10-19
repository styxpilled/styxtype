<script lang="ts">
	import '@fontsource/zen-tokyo-zoo';
	const colors = ['#ec1c00', '#f5b500', '#006021', '#ab0d44', '#435b9e'];
</script>

<div class="preview">
	<h3>
		{#each 'Zen Tokio Zoo'.split('') as char, i}
			<span style="--color: {colors[i % colors.length]}; color: var(--color);">{char}</span>
		{/each}
	</h3>
	<p>
		Zen Loop Family is one of three Latin fonts designed by Yoshimichi Ohira, as part of the Zen
		Fonts collection. Tokyo Zoo was originally designed for an animal exhibition. The stripes
		suggest zoo cages but overall it's a fun and stylish design.
	</p>
</div>

<style>
	.preview {
		font-family: 'Zen Tokyo Zoo', 'Wingdings';
		color: black;
		background-color: white;
	}

	h3 {
		border-radius: 2.5rem;
		line-height: 1;
		padding: 0.8rem 2.5rem;
		border: 0.5rem solid #292e2a;
	}

	p {
		font-family: var(--font-ui);
	}
</style>
