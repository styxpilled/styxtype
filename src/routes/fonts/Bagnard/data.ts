import type { Author, Category, Link } from '$lib/types';

export const title = 'Bagnard';

export const author: Author = {
	name: 'Sebastien Sanfilippo',
	href: null
};

export const category: Category = 'serif';

export const links: Link[] = [
	{
		href: 'https://fontsource.org/fonts/bagnard',
		label: 'Fontsource'
	},
	{
		href: 'https://open-foundry.com/fonts/bagnard_regular',
		label: 'Open Foundry'
	},
	{
		href: 'https://github.com/sebsan/Bagnard',
		label: 'Github'
	}
];

export const characters =
	'!$&(),-./0123456789:;?@ABCDEFGHIJKLMNOPQRSTUVWXYZ`abcdefghijklmnopqrstuvwxyz}~';
