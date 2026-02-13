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
	activeTheme: 'marathon'
});

type ThemeKey = 'arcana' | 'marathon';

export const themeData: {
	arcana: null;
	marathon: {
		frames: string[];
	} | null;
} = $state({
	arcana: null,
	marathon: null
});
