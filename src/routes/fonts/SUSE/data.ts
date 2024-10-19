import type { Font } from '$lib/types';

export const font: Font = {
	title: 'SUSE',
	author: {
		name: 'René Bieder',
		href: 'https://www.renebieder.com/'
	},
	category: 'sans-serif',
	characters: '',
	description: `%TITLE% is a sans-serif typeface designed by %AUTHOR%, embodying a unique hybrid between geometric and monospaced features. It was comissioned by the SUSE open-source software company to serve as their brand typeface.`,
	license: 'SIL',
	links: [
		{
			href: 'https://github.com/SUSE/suse-font',
			label: 'GitHub'
		},
		{
			href: 'https://fontsource.org/fonts/suse',
			label: 'Fontsource'
		},
		{
			href: 'https://fonts.google.com/specimen/SUSE',
			label: 'Google Fonts'
		}
	]
};
