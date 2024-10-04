import type { Author, Category, License, Link } from '$lib/types';

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
	},
	{
		href: 'https://fontsinuse.com/typefaces/46816/bagnard',
		label: 'Fonts In Use'
	}
];

export const characters =
	'!$&(),-./0123456789:;?@ABCDEFGHIJKLMNOPQRSTUVWXYZ`abcdefghijklmnopqrstuvwxyz“”’‘';

export const license: License = 'SIL';

export const description = `Bagnard Regular was inspired by the graffitis of an anonymous prisoner of the napoleonic wars. A serif font with bold yet sleek serifs, well suited for larger text.`;
