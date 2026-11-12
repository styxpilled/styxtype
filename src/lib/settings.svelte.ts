import { browse } from '#lib/browse.svelte.ts';

export const textDefaults = { size: 20, lineHeight: 1.5, tracking: 0 };

/** Kept per font for the session. Empty means font defaults. */
type FontSettings = {
	weight: number | null;
	italic: boolean;
	/** Only features the user changed. */
	features: Record<string, boolean>;
	/** Only axes the user changed. */
	axes: Record<string, number>;
};

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

	featureSettings = $derived(
		Object.entries(this.font.features)
			.map(([tag, on]) => `"${tag}" ${on ? 1 : 0}`)
			.join(', ') || 'normal'
	);

	variationSettings = $derived(
		Object.entries(this.font.axes)
			.map(([tag, value]) => `"${tag}" ${value}`)
			.join(', ') || 'normal'
	);
}

export const settings = new Settings();
