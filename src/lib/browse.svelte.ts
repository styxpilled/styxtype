import type { Category, FilterData, IndexEntry } from '#lib/catalog.ts';
import { categories } from '#lib/catalog.ts';
import index from '#lib/generated/index.json';

export const fonts = (index as IndexEntry[]).toSorted((a, b) => a.name.localeCompare(b.name));

export type Sort = 'name' | 'category';

class Browse {
	query = $state('');
	categories = $state<Category[]>([]);
	tags = $state<string[]>([]);
	licenses = $state<string[]>([]);
	sort = $state<Sort>('name');
	/** Loaded after start from static/fonts/filters.json. */
	filterData = $state<Record<string, FilterData> | null>(null);
	selected = $state(fonts[0]?.slug ?? '');

	visible = $derived.by(() => {
		const query = this.query.trim().toLowerCase();
		const result = fonts.filter(
			(f) =>
				f.name.toLowerCase().includes(query) &&
				(this.categories.length === 0 || this.categories.includes(f.category)) &&
				this.tags.every((t) => f.tags.includes(t)) &&
				(this.licenses.length === 0 ||
					this.licenses.includes(this.filterData?.[f.slug]?.license ?? ''))
		);
		if (this.sort === 'category') {
			result.sort((a, b) => categories.indexOf(a.category) - categories.indexOf(b.category));
		}
		return result;
	});

	current = $derived(fonts.find((f) => f.slug === this.selected) ?? fonts[0]);

	filtered = $derived(
		this.query.trim() !== '' ||
			this.categories.length > 0 ||
			this.tags.length > 0 ||
			this.licenses.length > 0
	);

	step(by: number) {
		const list = this.visible;
		if (list.length === 0) return;
		const i = list.findIndex((f) => f.slug === this.selected);
		const next = i === -1 ? 0 : (i + by + list.length) % list.length;
		this.selected = list[next].slug;
	}

	clearFilters() {
		this.query = '';
		this.categories = [];
		this.tags = [];
		this.licenses = [];
	}
}

export const browse = new Browse();
