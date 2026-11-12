/* eslint-disable svelte/prefer-svelte-reactivity -- Caches, not UI state. */
import type { Face, FontMeta } from '#lib/catalog.ts';
import { SvelteSet } from 'svelte/reactivity';

const subsets = new Map<string, Promise<void>>();
const fulls = new Map<string, Promise<void>>();
const metas = new Map<string, Promise<FontMeta>>();

/** Slugs whose subset finished loading, with or without success. */
export const subsetsSettled = new SvelteSet<string>();

export const subsetFamily = (slug: string) => `${slug} subset`;

/** Full font, then subset while the full font loads, then Adobe Blank for missing glyphs. */
export const fontStack = (slug: string) => `'${slug}', '${subsetFamily(slug)}', 'Adobe Blank'`;

export function loadSubset(slug: string): Promise<void> {
	let promise = subsets.get(slug);
	if (!promise) {
		promise = new FontFace(subsetFamily(slug), `url(/fonts/${slug}/subset.woff2)`)
			.load()
			.then((face) => void document.fonts.add(face))
			.catch(() => {})
			.finally(() => subsetsSettled.add(slug));
		subsets.set(slug, promise);
	}
	return promise;
}

export function loadMeta(slug: string): Promise<FontMeta> {
	let promise = metas.get(slug);
	if (!promise) {
		promise = fetch(`/fonts/${slug}/meta.json`).then((r) => {
			if (!r.ok) throw new Error(`meta.json for ${slug}: ${r.status}`);
			return r.json();
		});
		promise.catch(() => metas.delete(slug));
		metas.set(slug, promise);
	}
	return promise;
}

// OS/2 usWidthClass to font-stretch.
const stretchByClass = [50, 62.5, 75, 87.5, 100, 112.5, 125, 150, 200];

const range = (value: number | [number, number]) =>
	Array.isArray(value) ? `${value[0]} ${value[1]}` : `${value}`;

function descriptors(face: Face): FontFaceDescriptors {
	const wdth = face.axes.find((a) => a.tag === 'wdth');
	return {
		weight: range(face.weight),
		style: face.italic ? 'italic' : 'normal',
		stretch: wdth ? `${wdth.min}% ${wdth.max}%` : `${stretchByClass[face.width - 1] ?? 100}%`,
		// The subset shows until the full font is ready.
		display: 'swap'
	};
}

/** Adds all faces. Only the primary face loads now, the browser loads the others on use. */
export function loadFull(slug: string): Promise<void> {
	let promise = fulls.get(slug);
	if (!promise) {
		promise = loadMeta(slug).then((meta) => {
			const faces = meta.faces.map((face) => {
				const fontFace = new FontFace(slug, `url(/fonts/${slug}/${face.file})`, descriptors(face));
				document.fonts.add(fontFace);
				return fontFace;
			});
			const primary = faces[meta.faces.findIndex((f) => f.file === meta.primary)];
			return primary?.load().then(
				() => {},
				(error) => {
					// Remove the faces so that a retry does not add them twice.
					for (const f of faces) document.fonts.delete(f);
					throw error;
				}
			);
		});
		promise.catch(() => fulls.delete(slug));
		fulls.set(slug, promise);
	}
	return promise;
}

const observed = new WeakMap<Element, string>();
let io: IntersectionObserver | undefined;

// No margin: rootMargin and scrollMargin also count entries in a collapsed sheet below the screen.
const observer = () =>
	(io ??= new IntersectionObserver((entries) => {
		for (const entry of entries) {
			if (!entry.isIntersecting) continue;
			const slug = observed.get(entry.target);
			if (slug) loadSubset(slug);
			io!.unobserve(entry.target);
		}
	}));

/** Attachment: loads the subset of `slug` when the element comes near the visible area. */
export const preview = (slug: string) => (el: Element) => {
	if (subsets.has(slug)) return;
	observed.set(el, slug);
	observer().observe(el);
	return () => observer().unobserve(el);
};
