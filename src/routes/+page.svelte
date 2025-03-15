<script lang="ts">
	import { previews } from '$lib/state.svelte.js';

	let { data } = $props();
	let showing = $state(false);
</script>

<svelte:window
	onmousemove={(e) => {
		if (window.innerHeight - e.y < 150) {
			showing = true;
		} else {
			showing = false;
		}
	}}
/>

<ul class="previews">
	{#each data.previews as Preview}
		<li class="preview-wrapper">
			<Preview.default />
		</li>
	{/each}
</ul>
<div class="typetest noise-light" class:showing>
	<input
		type="text"
		class="inherit"
		placeholder="Preview text here..."
		bind:value={previews.heading}
	/>
</div>

<style>
	.typetest {
		--width: 20ch;
		padding: 0.25rem 1rem;
		font-size: 4rem;
		border-radius: 1rem;
		position: fixed;
		bottom: -10rem;
		transition: bottom 500ms ease-in-out;
		width: var(--width);
		left: calc(50% - var(--width) / 2);
		--background: #87ccf8;
		z-index: 254;

		&.showing,
		&:has(> input:focus) {
			bottom: 1rem;
		}

		& > input {
			width: calc(var(--width) - 1rem);

			&::placeholder {
				color: rgba(245, 245, 245, 0.632);
			}
		}
	}

	ul.previews {
		color: black;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
	}

	.preview-wrapper {
		min-width: 100%;
		display: flex;
		justify-content: center;
	}

	:global(:where(.preview-wrapper > .preview)) {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;

		border-radius: 1rem;
		font-size: 1.5rem;
		padding-top: 3rem;
		padding-bottom: 2rem;
	}

	:global(:where(.preview-wrapper > .preview h3)) {
		padding-bottom: 2rem;
		word-wrap: break-word;
		overflow-wrap: break-word;
		word-break: break-all;
	}

	:global(:where(.preview-wrapper > .preview > *:not(.bg))) {
		max-width: 50dvw;
		text-align: center;
	}

	:global(:where(.preview-wrapper .preview) h3:not(.size-override)) {
		font-size: clamp(16px, 8vw, 8rem);
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
