export type Link = {
	label: string;
	href: string;
};

export type Author = {
	name: string;
	href: string | null;
};

export type Category = 'serif' | 'sans-serif' | 'display' | 'monospace' | 'script';

export type License = 'SIL' | (string & {});

export type CSSSlider = {
	label: string;
	cssProperty: string;
	min: number;
	max: number;
	value: number;
	unit?: string;
	step?: number;
};

export type Weight = {
	label: string;
	value: number;
	italic: boolean;
};

export type Setting = {
	label: string;
	value: string;
	checked: boolean;
};

export type Font = {
	title: string;
	author: Author;
	href?: string;
	category: Category;
	links: Link[];
	description: string;
	characters: string;
	license: License;
};
