<script lang="ts">
	import { design } from '#lib/design.svelte.ts';
	import { fontStack, loadFull, loadSubset } from '#lib/fonts.svelte.ts';
	import { tokens } from '#lib/templates/index.ts';

	let template = $derived(design.template);

	$effect(() => {
		for (const role of template.roles) {
			const slug = design.font(role);
			loadSubset(slug);
			loadFull(slug).catch(() => {});
		}
	});

	let style = $derived(
		[
			...template.roles.map((role) => `--font-${role}: ${fontStack(design.font(role))}`),
			...template.roles.flatMap((role) => {
				const { features, variations } = design.css(role);
				return [
					`--case-${role}: ${design.uppercase[role] ? 'uppercase' : 'none'}`,
					`--features-${role}: ${features}`,
					`--axes-${role}: ${variations}`
				];
			}),
			...tokens.map((token) => `--t-${token}: ${design.scheme.colors[token]}`)
		].join('; ')
	);
</script>

<div class="artboard" {style}>
	<template.component />
</div>

<style>
	.artboard {
		flex: 1;
		display: flex;
		flex-direction: column;
		container-type: inline-size;
		border-radius: var(--radius-control);
		overflow: hidden;
		box-shadow: var(--shadow-control);

		> :global(*) {
			flex: 1;
		}
	}
</style>
