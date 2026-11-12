// Mirrors the pipeline output (pipeline/__main__.py).

export const categories = [
	'serif',
	'sans',
	'slab',
	'mono',
	'script',
	'blackletter',
	'display'
] as const;

export type Category = (typeof categories)[number];

export const categoryLabels: Record<Category, string> = {
	serif: 'Serif',
	sans: 'Sans serif',
	slab: 'Slab serif',
	mono: 'Monospace',
	script: 'Script',
	blackletter: 'Blackletter',
	display: 'Display'
};

/** src/lib/generated/index.json, imported and prerendered. */
export type IndexEntry = {
	slug: string;
	name: string;
	category: Category;
	tags: string[];
};

/** static/fonts/filters.json, keyed by slug, loaded after start. */
export type FilterData = {
	license: string | null;
	designers: string[];
	weights: [number, number];
	italic: boolean;
	variable: boolean;
	axes: string[];
	features: string[];
};

export type Designer = {
	name: string;
	url: string | null;
};

export type License = {
	id: string | null;
	url: string | null;
};

export type Axis = {
	tag: string;
	name: string;
	min: number;
	default: number;
	max: number;
};

export type Face = {
	file: string;
	weight: number | [number, number];
	italic: boolean;
	width: number;
	axes: Axis[];
	instances: { name: string; coordinates: Record<string, number> }[];
	features: string[];
};

/** Font units. */
export type Metrics = {
	units_per_em: number;
	ascender: number;
	descender: number;
	x_height: number | null;
	cap_height: number | null;
};

/** static/fonts/<slug>/meta.json, loaded on select. */
export type FontMeta = IndexEntry & {
	source: string | null;
	designers: Designer[];
	license: License;
	copyright: string | null;
	description: string | null;
	version: string | null;
	metrics: Metrics;
	faces: Face[];
	features: string[];
	/** Inclusive code point ranges. */
	charset: [number, number][];
};
