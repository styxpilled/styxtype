import { browse } from '#lib/browse.svelte.ts';

export const textDefaults = { size: 20, lineHeight: 1.5, tracking: 0 };

/** Only the features and axes the user changed. */
export type Tuned = { features: Record<string, boolean>; axes: Record<string, number> };

export const featureCss = (t: Tuned) =>
	Object.entries(t.features)
		.map(([tag, on]) => `"${tag}" ${on ? 1 : 0}`)
		.join(', ') || 'normal';

export const variationCss = (t: Tuned) =>
	Object.entries(t.axes)
		.map(([tag, value]) => `"${tag}" ${value}`)
		.join(', ') || 'normal';

const tagPattern = /^[\w ]{4}$/;

/** Drops bad entries from untrusted data, such as a shared link. */
export const cleanTuned = (v: Partial<Tuned> | undefined): Tuned => ({
	features: Object.fromEntries(
		Object.entries(v?.features ?? {}).filter(
			([tag, on]) => tagPattern.test(tag) && typeof on === 'boolean'
		)
	),
	axes: Object.fromEntries(
		Object.entries(v?.axes ?? {}).filter(
			([tag, value]) => tagPattern.test(tag) && Number.isFinite(value)
		)
	)
});

export const isTuned = (t: Tuned) =>
	Object.keys(t.features).length > 0 || Object.keys(t.axes).length > 0;

/** Kept per font for the session. Empty means font defaults. */
export type FontSettings = Tuned & { weight: number | null; italic: boolean };

const empty = (): FontSettings => ({ weight: null, italic: false, features: {}, axes: {} });

class Settings {
	/** px */
	size = $state(textDefaults.size);
	lineHeight = $state(textDefaults.lineHeight);
	/** em */
	tracking = $state(textDefaults.tracking);

	#byFont = $state<Record<string, FontSettings>>({});

	/** Read only. Change it with `edit`. */
	font = $derived(this.#byFont[browse.selected] ?? empty());

	edit(change: (font: FontSettings) => void) {
		change((this.#byFont[browse.selected] ??= empty()));
	}

	snapshot() {
		const text = { size: this.size, lineHeight: this.lineHeight, tracking: this.tracking };
		const changed = (Object.keys(text) as (keyof typeof text)[]).some(
			(k) => text[k] !== textDefaults[k]
		);
		const fonts = Object.fromEntries(
			Object.entries(this.#byFont).filter(([, f]) => f.weight !== null || f.italic || isTuned(f))
		);
		return {
			text: changed ? text : undefined,
			fonts: Object.keys(fonts).length ? fonts : undefined
		};
	}

	restore(data: Partial<ReturnType<Settings['snapshot']>>) {
		const num = (v: unknown, fallback: number) => (Number.isFinite(v) ? (v as number) : fallback);
		if (data.text) {
			this.size = num(data.text.size, textDefaults.size);
			this.lineHeight = num(data.text.lineHeight, textDefaults.lineHeight);
			this.tracking = num(data.text.tracking, textDefaults.tracking);
		}
		for (const [slug, f] of Object.entries(data.fonts ?? {})) {
			this.#byFont[slug] = {
				...cleanTuned(f),
				weight: Number.isFinite(f.weight) ? f.weight : null,
				italic: f.italic === true
			};
		}
	}

	featureSettings = $derived(featureCss(this.font));
	variationSettings = $derived(variationCss(this.font));
}

export const settings = new Settings();
