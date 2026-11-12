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
	/** Width of the name preview in static/fonts/names.svg, in em. */
	name_width: number;
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
	/** Auto-tags from the pipeline analysis. */
	scripts: string[];
	properties: string[];
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

export type Analysis = {
	weight_class: number;
	width_class: number;
	panose: number[];
	monospace: boolean;
	/** ISO 15924 code to number of characters. */
	script_chars: Record<string, number>;
	scripts: string[];
	properties: string[];
};

/** static/fonts/<slug>/meta.json, loaded on select. */
export type FontMeta = Omit<IndexEntry, 'name_width'> & {
	source: string | null;
	designers: Designer[];
	license: License;
	copyright: string | null;
	description: string | null;
	/** Hero text for the specimen view. */
	specimen: string | null;
	version: string | null;
	metrics: Metrics;
	/** woff2 file of the face closest to upright 400. */
	primary: string;
	faces: Face[];
	features: string[];
	analysis: Analysis;
	/** Font-provided names of ssXX and cvXX features. */
	feature_names: Record<string, string>;
	/** Inclusive code point ranges. */
	charset: [number, number][];
};

/** static/fonts/<slug>/glyphs.json, loaded when the glyph view opens. */
export type GlyphData = {
	/**
	 * Per face, in `FontMeta.faces` order: flat [advance, lsb, rsb, ...] in font units.
	 * Glyph i is code point i of the expanded charset. Unencoded alternates follow.
	 * Null where the face has no such glyph or the glyph has no outline.
	 */
	faces: (number | null)[][];
	/** Per face: axis values of the instance the metrics are for. Null for static faces. */
	locations: (Record<string, number> | null)[];
	/** Code point to {feature tag: glyph indexes}. The nth index is feature value n + 1. */
	alternates: Record<string, Record<string, number[]>>;
};
