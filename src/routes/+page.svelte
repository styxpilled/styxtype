<script lang="ts">
	export let data;
</script>

<ul class="previews">
	{#each data.previews as preview}
		<li class="preview-wrapper">
			<svelte:component this={preview.default} />
		</li>
	{/each}
</ul>

<style>
	ul.previews {
		color: black;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	:global(:where(.preview-wrapper > .preview)) {
		display: flex;
		flex-direction: column;
		align-items: center;

		border-radius: 1rem;
		font-size: 1.5rem;
		padding-top: 1rem;
		padding-bottom: 2rem;
	}

	:global(:where(.preview-wrapper > .preview > *)) {
		max-width: 50dvw;
		text-align: center;
	}

	:global(:where(.preview-wrapper .preview) h3:not(.size-override)) {
		font-size: 8rem;
	}

	:global(:where(.preview-wrapper) > .preview > label) {
		display: flex;
		width: 40rem;
		align-items: center;
	}

	:global(:where(.preview-wrapper) > .preview > label > span.label) {
		display: inline;
		width: 14rem;
		text-align: right;
	}
</style>
