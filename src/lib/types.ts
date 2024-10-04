export type Link = {
	label: string;
	href: string;
};

export type Author = {
	name: string;
	href: string | null;
};

export type Category = 'serif' | 'sans-serif' | 'display' | 'monospace' | 'script';

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
