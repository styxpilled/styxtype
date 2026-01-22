import type texts from '$lib/assets/texts.json';
import type { Font } from '../fonts';

export const app = $state<{
	activeFont: string;
	activePreview: keyof typeof texts | 'charset';
	font?: Font;
}>({
	activeFont: '',
	activePreview: 'Prachett',
	font: undefined
});
