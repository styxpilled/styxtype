export const featureGroups = [
	'Ligatures',
	'Alternates',
	'Stylistic sets',
	'Figures',
	'Case and position',
	'Spacing',
	'Other'
] as const;

export type FeatureGroup = (typeof featureGroups)[number];

type Info = { name: string; group: FeatureGroup };

const known: Record<string, Info> = {
	liga: { name: 'Standard ligatures', group: 'Ligatures' },
	clig: { name: 'Contextual ligatures', group: 'Ligatures' },
	dlig: { name: 'Discretionary ligatures', group: 'Ligatures' },
	hlig: { name: 'Historical ligatures', group: 'Ligatures' },

	calt: {
		name: 'Contextual alternates',
		group: 'Alternates'
	},
	salt: { name: 'Stylistic alternates', group: 'Alternates' },
	swsh: { name: 'Swashes', group: 'Alternates' },
	cswh: { name: 'Contextual swashes', group: 'Alternates' },
	hist: {
		name: 'Historical forms',
		group: 'Alternates'
	},
	titl: { name: 'Titling', group: 'Alternates' },

	lnum: { name: 'Lining figures', group: 'Figures' },
	onum: { name: 'Oldstyle figures', group: 'Figures' },
	pnum: { name: 'Proportional figures', group: 'Figures' },
	tnum: { name: 'Tabular figures', group: 'Figures' },
	zero: { name: 'Slashed zero', group: 'Figures' },
	frac: { name: 'Fractions', group: 'Figures' },
	afrc: { name: 'Stacked fractions', group: 'Figures' },

	case: {
		name: 'Case-sensitive forms',
		group: 'Case and position'
	},
	smcp: { name: 'Small capitals', group: 'Case and position' },
	c2sc: { name: 'Capitals to small capitals', group: 'Case and position' },
	pcap: { name: 'Petite capitals', group: 'Case and position' },
	c2pc: { name: 'Capitals to petite capitals', group: 'Case and position' },
	unic: { name: 'Unicase', group: 'Case and position' },
	sups: { name: 'Superscript', group: 'Case and position' },
	subs: { name: 'Subscript', group: 'Case and position' },
	sinf: {
		name: 'Scientific inferiors',
		group: 'Case and position'
	},
	numr: { name: 'Numerators', group: 'Case and position' },
	dnom: { name: 'Denominators', group: 'Case and position' },
	ordn: { name: 'Ordinals', group: 'Case and position' },

	kern: { name: 'Kerning', group: 'Spacing' },
	cpsp: { name: 'Capital spacing', group: 'Spacing' }
};

// Shaping internals: the browser applies them and turning them off only breaks text.
const hidden = new Set([
	'aalt',
	'abvm',
	'blwm',
	'ccmp',
	'curs',
	'dist',
	'fina',
	'init',
	'isol',
	'locl',
	'mark',
	'medi',
	'mkmk',
	'rlig',
	'rvrn'
]);

/** Features the browser turns on by default. */
const onByDefault = new Set(['kern', 'liga', 'clig', 'calt']);

export type Feature = Info & { tag: string; defaultOn: boolean };

export function describe(tag: string, names: Record<string, string> = {}): Feature | null {
	if (hidden.has(tag)) return null;
	const set = /^(ss|cv)(\d\d)$/.exec(tag);
	const info: Info = known[tag] ?? {
		name:
			names[tag] ??
			(set ? `${set[1] === 'ss' ? 'Stylistic set' : 'Character variant'} ${Number(set[2])}` : tag),
		group: set?.[1] === 'ss' ? 'Stylistic sets' : set ? 'Alternates' : 'Other'
	};
	return { ...info, tag, defaultOn: onByDefault.has(tag) };
}

export function groupFeatures(tags: string[], names?: Record<string, string>) {
	const order = Object.keys(known);
	const rank = (tag: string) => (order.includes(tag) ? order.indexOf(tag) : order.length);
	const features = tags
		.toSorted((a, b) => rank(a) - rank(b) || a.localeCompare(b))
		.map((t) => describe(t, names))
		.filter((f): f is Feature => f !== null);
	return featureGroups
		.map((group) => ({ group, features: features.filter((f) => f.group === group) }))
		.filter((g) => g.features.length > 0);
}
