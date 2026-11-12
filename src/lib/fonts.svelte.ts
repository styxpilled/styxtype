/* eslint-disable svelte/prefer-svelte-reactivity -- Caches, not UI state. */
import type { Face, FontMeta, GlyphData } from '#lib/catalog.ts';

const subsets = new Map<string, Promise<void>>();
const fulls = new Map<string, Promise<void>>();
const metas = new Map<string, Promise<FontMeta>>();
const glyphs = new Map<string, Promise<GlyphData>>();

export const subsetFamily = (slug: string) => `${slug} subset`;

/** Full font, then subset while the full font loads, then Adobe Blank for missing glyphs. */
export const fontStack = (slug: string) => `'${slug}', '${subsetFamily(slug)}', 'Adobe Blank'`;

export function loadSubset(slug: string): Promise<void> {
	let promise = subsets.get(slug);
	if (!promise) {
		promise = new FontFace(subsetFamily(slug), `url(/fonts/${slug}/subset.woff2)`)
			.load()
			.then((face) => void document.fonts.add(face))
			.catch(() => {});
		subsets.set(slug, promise);
	}
	return promise;
}

function loadJson<T>(cache: Map<string, Promise<T>>, slug: string, file: string): Promise<T> {
	let promise = cache.get(slug);
	if (!promise) {
		promise = fetch(`/fonts/${slug}/${file}`).then((r) => {
			if (!r.ok) throw new Error(`${file} for ${slug}: ${r.status}`);
			return r.json();
		});
		promise.catch(() => cache.delete(slug));
		cache.set(slug, promise);
	}
	return promise;
}

export const loadMeta = (slug: string) => loadJson(metas, slug, 'meta.json');
export const loadGlyphs = (slug: string) => loadJson(glyphs, slug, 'glyphs.json');

// OS/2 usWidthClass to font-stretch.
const stretchByClass = [50, 62.5, 75, 87.5, 100, 112.5, 125, 150, 200];

const range = (value: number | [number, number]) =>
	Array.isArray(value) ? `${value[0]} ${value[1]}` : `${value}`;

export function descriptors(face: Face): FontFaceDescriptors {
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
