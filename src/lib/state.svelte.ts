import type texts from '$lib/assets/texts.json';

export const app = $state<{
	activeFont: string;
	activePreview: keyof typeof texts | 'charset';
}>({
	activeFont: '',
	activePreview: 'Prachett'
});
