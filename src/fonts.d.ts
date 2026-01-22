export type Font = {
	name: string;
	author: {
		href: string | null;
		name: string | null;
	} | null;
	href: string | null;
	description: string;
	category: 'sans-serif' | 'serif' | 'monospace' | 'display' | 'script';
	characters: string;
	license: string;
	links: string[];
	font: () => string;
	style?: string;
};
