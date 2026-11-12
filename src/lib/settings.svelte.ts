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

/** Kept per font for the session. Empty means font defaults. */
type FontSettings = Tuned & { weight: number | null; italic: boolean };

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

	featureSettings = $derived(featureCss(this.font));
	variationSettings = $derived(variationCss(this.font));
}

export const settings = new Settings();
