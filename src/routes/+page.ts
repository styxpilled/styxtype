import type { Component } from 'svelte';
import type { PageLoad } from './$types';
import { fonts } from './fonts/list';

const importPreview = async (font: string) => {
	return import(`./fonts/${font}/Preview.svelte`);
};

export const load: PageLoad = async () => {
	const loadingPreviews: Promise<{ default: Component }>[] = [];

	for (const font of fonts) {
		loadingPreviews.push(importPreview(font));
	}

	const previews = await Promise.all(loadingPreviews);

	return {
		previews
	};
};
