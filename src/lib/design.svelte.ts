import { browse } from '#lib/browse.svelte.ts';
import { cleanTuned, featureCss, isTuned, variationCss, type Tuned } from '#lib/settings.svelte.ts';
import { templates, type Role } from '#lib/templates/index.ts';

const untuned = (): Tuned => ({ features: {}, axes: {} });

export type Flow = 'inspect' | 'design';

export const views = ['specimen', 'tester', 'glyphs'] as const;
export type View = (typeof views)[number];

class Design {
	flow = $state<Flow>('inspect');
	/** The neutral flow view. */
	view = $state<View>('specimen');
	templateId = $state(templates[0].id);
	/** Scheme per template, so a switch back keeps the choice. */
	schemes = $state<Record<string, string>>({});
	pinned = $state<Record<Role, string | null>>({ display: null, body: null });
	uppercase = $state<Record<Role, boolean>>({ display: false, body: false });
	/** The role the inspector settings apply to. */
	active = $state<Role>('display');
	/** Per role and font, so a role keeps the settings of each font it had. */
	#tuned = $state<Record<string, Tuned>>({});

	template = $derived(templates.find((t) => t.id === this.templateId) ?? templates[0]);
	scheme = $derived(
		this.template.schemes.find((s) => s.id === this.schemes[this.template.id]) ??
			this.template.schemes[0]
	);

	/** A role without a pinned font shows the font selected in the list. */
	font(role: Role): string {
		return this.pinned[role] ?? browse.selected;
	}

	tuned(role: Role): Tuned {
		return this.#tuned[`${role}:${this.font(role)}`] ?? untuned();
	}

	tune(role: Role, change: (t: Tuned) => void) {
		change((this.#tuned[`${role}:${this.font(role)}`] ??= untuned()));
	}

	css(role: Role) {
		const t = this.tuned(role);
		return { features: featureCss(t), variations: variationCss(t) };
	}

	snapshot() {
		const tuned = Object.fromEntries(Object.entries(this.#tuned).filter(([, t]) => isTuned(t)));
		const uppercase = Object.values(this.uppercase).some(Boolean) ? this.uppercase : undefined;
		return { tuned: Object.keys(tuned).length ? tuned : undefined, uppercase };
	}

	restore(data: Partial<ReturnType<Design['snapshot']>>) {
		for (const [key, t] of Object.entries(data.tuned ?? {})) this.#tuned[key] = cleanTuned(t);
		for (const role of ['display', 'body'] as const) {
			if (data.uppercase?.[role] === true) this.uppercase[role] = true;
		}
	}

	togglePin(role: Role) {
		this.pinned[role] = this.pinned[role] ? null : browse.selected;
	}
}

export const design = new Design();
