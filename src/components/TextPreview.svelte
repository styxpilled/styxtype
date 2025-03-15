<script lang="ts">
	import { previews } from '$lib/state.svelte';
	import type { Font } from '$lib/types';

	let {
		font
	}: {
		font: Font;
	} = $props();

	const title = font?.title || 'ERROR';

	const process = (e: Event & { currentTarget: EventTarget & HTMLInputElement }) => {
		previews.heading = e.currentTarget.value;
	};

	const prepare = (e: Event & { currentTarget: EventTarget & HTMLInputElement }) => {
		if (previews.heading === '') {
			e.currentTarget.value = '';
		}
	};
</script>

<h3>
	<input
		type="text"
		class:active={previews.heading === ''}
		value={previews.heading !== '' ? previews.heading : title}
		onbeforeinput={prepare}
		oninput={process}
	/>
	<span style="display: none;">.</span>
</h3>

<style>
	input {
		text-align: center;
		max-width: 100%;
		&:focus-visible {
			margin: 0;
			border: none;
			outline: none;
		}
	}
	input.active:focus-visible {
		/* color: transparent; */
	}
</style>
