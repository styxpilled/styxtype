import type texts from '$lib/assets/texts.json';
import type { Font } from '../fonts';

export const app = $state<{
	activeFont: string;
	activePreview: keyof typeof texts | 'charset' | 'typetest';
	font?: Font;
	activeTheme: ThemeKey;
}>({
	activeFont: '',
	activePreview: 'Prachett',
	font: undefined,
	activeTheme: 'deadlock'
});

type ThemeKey = 'deadlock' | 'marathon';

export const skinData: {
	deadlock: null;
	marathon: {
		frames: string[];
	} | null;
} = $state({
	deadlock: null,
	marathon: null
});
