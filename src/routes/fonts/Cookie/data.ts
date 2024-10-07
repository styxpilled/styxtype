import type { Author, Category, License, Link } from '$lib/types';

const title = 'Cookie';

const author: Author = {
	name: 'Ania Kruk',
	href: null
};

const category: Category = 'script';

const links: Link[] = [
	{
		href: 'https://fontsource.org/fonts/cookie',
		label: 'Fontsource'
	},
	{
		href: 'https://fonts.google.com/specimen/Cookie',
		label: 'Google Fonts'
	}
];

const characters =
	'!$&(),-./0123456789:;?@ABCDEFGHIJKLMNOPQRSTUVWXYZ`abcdefghijklmnopqrstuvwxyz“”’‘';

const license: License = 'SIL';

const description = `is a script typeface based on brush calligraphy. It has a little bit of 1950s style that makes you think about all the beautiful ads and pin-ups from this time. It is sweet and friendly - but not too decorative; simple and legible even in text sizes.`;

export const font = {
	title,
	author,
	category,
	license,
	links,
	description,
	characters
};
