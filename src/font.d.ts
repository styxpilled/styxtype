export type Font = {
	name: string;
	author: {
		href: string | null;
		name: string | null;
	} | null;
	href: string | null;
	description: string;
	category: 'sans-serif' | 'serif' | 'monospace' | 'display' | 'script';
	license: string;
	links: string[];
	font: () => string;
	style?: string;
};
