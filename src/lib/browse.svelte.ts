import type { Category, FilterData, IndexEntry } from '#lib/catalog.ts';
import { categories, categoryLabels } from '#lib/catalog.ts';
import index from '#lib/generated/index.json';

export const fonts = (index as IndexEntry[]).toSorted((a, b) => a.name.localeCompare(b.name));

export type Sort = 'name' | 'category';

export type Group = { id: string; label: string | null; fonts: IndexEntry[] };

const pinsKey = 'styxtype:pins';

class Browse {
	query = $state('');
	categories = $state<Category[]>([]);
	tags = $state<string[]>([]);
	scripts = $state<string[]>([]);
	properties = $state<string[]>([]);
	licenses = $state<string[]>([]);
	sort = $state<Sort>('name');
	/** Loaded after start from static/fonts/filters.json. */
	filterData = $state<Record<string, FilterData> | null>(null);
	selected = $state(fonts[0]?.slug ?? '');
	/** Read from localStorage on mount, so the server render has none. */
	pinned = $state<string[]>([]);
	collapsed = $state<string[]>([]);

	visible = $derived.by(() => {
		const query = this.query.trim().toLowerCase();
		const result = fonts.filter(
			(f) =>
				f.name.toLowerCase().includes(query) &&
				(this.categories.length === 0 || this.categories.includes(f.category)) &&
				this.tags.every((t) => f.tags.includes(t)) &&
				this.scripts.every((t) => this.filterData?.[f.slug]?.scripts.includes(t)) &&
				this.properties.every((t) => this.filterData?.[f.slug]?.properties.includes(t)) &&
				(this.licenses.length === 0 ||
					this.licenses.includes(this.filterData?.[f.slug]?.license ?? ''))
		);
		if (this.sort === 'category') {
			result.sort((a, b) => categories.indexOf(a.category) - categories.indexOf(b.category));
		}
		return result;
	});

	/** Pinned fonts first, then the rest by name or by category. */
	groups = $derived.by(() => {
		const pinned = this.visible.filter((f) => this.pinned.includes(f.slug));
		const rest = this.visible.filter((f) => !this.pinned.includes(f.slug));
		const groups: Group[] = [];
		if (pinned.length) groups.push({ id: 'pinned', label: 'Pinned', fonts: pinned });
		if (this.sort === 'name') {
			groups.push({ id: 'all', label: null, fonts: rest });
		} else {
			// rest is already sorted by category, so key order matches.
			for (const [c, list] of Object.entries(Object.groupBy(rest, (f) => f.category))) {
				groups.push({ id: c, label: categoryLabels[c as Category], fonts: list ?? [] });
			}
		}
		return groups;
	});

	/** The fonts in list order, without collapsed groups. */
	order = $derived(
		this.groups.filter((g) => !this.collapsed.includes(g.id)).flatMap((g) => g.fonts)
	);

	current = $derived(fonts.find((f) => f.slug === this.selected) ?? fonts[0]);

	filtered = $derived(
		this.query.trim() !== '' ||
			this.categories.length > 0 ||
			this.tags.length > 0 ||
			this.scripts.length > 0 ||
			this.properties.length > 0 ||
			this.licenses.length > 0
	);

	step(by: number) {
		const list = this.order;
		if (list.length === 0) return;
		const i = list.findIndex((f) => f.slug === this.selected);
		const next = i === -1 ? 0 : (i + by + list.length) % list.length;
		this.selected = list[next].slug;
	}

	loadPins() {
		try {
			const saved = JSON.parse(localStorage.getItem(pinsKey) ?? '[]');
			if (Array.isArray(saved)) this.pinned = saved.filter((s) => fonts.some((f) => f.slug === s));
		} catch {
			// Storage can be blocked or hold bad data.
		}
	}

	togglePin(slug: string) {
		this.pinned = this.pinned.includes(slug)
			? this.pinned.filter((s) => s !== slug)
			: [...this.pinned, slug];
		try {
			localStorage.setItem(pinsKey, JSON.stringify(this.pinned));
		} catch {
			// Pins then last only for this visit.
		}
	}

	toggleCollapsed(id: string) {
		this.collapsed = this.collapsed.includes(id)
			? this.collapsed.filter((c) => c !== id)
			: [...this.collapsed, id];
	}

	clearFilters() {
		this.query = '';
		this.categories = [];
		this.tags = [];
		this.scripts = [];
		this.properties = [];
		this.licenses = [];
	}
}

export const browse = new Browse();
