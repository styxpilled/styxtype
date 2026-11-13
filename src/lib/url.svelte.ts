import { goto } from '$app/navigation';
import { untrack } from 'svelte';
import { browse, fonts } from '#lib/browse.svelte.ts';
import { design, views, type View } from '#lib/design.svelte.ts';
import { settings } from '#lib/settings.svelte.ts';
import { templates, type Role } from '#lib/templates/index.ts';

const roles: Role[] = ['display', 'body'];

const isFont = (slug: string | null): slug is string =>
	slug !== null && fonts.some((f) => f.slug === slug);

/** Short, readable state. Defaults are left out. */
function readable() {
	// Built fresh on each call, so it needs no reactivity.
	// eslint-disable-next-line svelte/prefer-svelte-reactivity
	const p = new URLSearchParams();
	if (browse.selected !== fonts[0]?.slug) p.set('font', browse.selected);
	if (design.flow === 'design') {
		p.set('template', design.template.id);
		if (design.scheme.id !== design.template.schemes[0].id) p.set('scheme', design.scheme.id);
		for (const role of roles) {
			const pinned = design.pinned[role];
			if (pinned) p.set(role, pinned);
		}
	} else if (design.view !== 'specimen') {
		p.set('view', design.view);
	}
	return p;
}

const toBase64Url = (text: string) =>
	btoa(String.fromCharCode(...new TextEncoder().encode(text)))
		.replaceAll('+', '-')
		.replaceAll('/', '_')
		.replace(/=+$/, '');

const fromBase64Url = (value: string) =>
	new TextDecoder().decode(
		Uint8Array.from(atob(value.replaceAll('-', '+').replaceAll('_', '/')), (c) => c.charCodeAt(0))
	);

function advanced() {
	const data = { settings: settings.snapshot(), design: design.snapshot() };
	const empty = Object.values(data).every((part) => Object.values(part).every((v) => !v));
	return empty ? null : toBase64Url(JSON.stringify(data));
}

let restored = false;

function restore() {
	const p = new URLSearchParams(location.search);
	const font = p.get('font');
	if (isFont(font)) browse.selected = font;
	const view = p.get('view');
	if (views.includes(view as View)) design.view = view as View;
	const template = templates.find((t) => t.id === p.get('template'));
	if (template) {
		design.flow = 'design';
		design.templateId = template.id;
		const scheme = template.schemes.find((s) => s.id === p.get('scheme'));
		if (scheme) design.schemes[template.id] = scheme.id;
		for (const role of roles) {
			const pinned = p.get(role);
			if (isFont(pinned)) design.pinned[role] = pinned;
		}
	}
	const s = p.get('s');
	if (s) {
		try {
			const data = JSON.parse(fromBase64Url(s));
			settings.restore(data.settings ?? {});
			design.restore(data.design ?? {});
		} catch {
			// A broken link keeps the readable state only.
		}
	}
}

/** Call in an effect. Reads the URL once, then writes the state to it. */
export function sync() {
	if (!restored) {
		untrack(restore);
		restored = true;
	}
	const search = readable().toString();
	const current = location.search.slice(1);
	if (search === current) return;
	// Replace, so browsing does not fill history.
	// Only the query changes, the path stays.
	// eslint-disable-next-line svelte/no-navigation-without-resolve
	goto(search ? `?${search}` : location.pathname, { shallow: true, replace: true });
}

/** The readable state plus all settings. */
export function shareUrl() {
	const p = readable();
	const s = advanced();
	if (s) p.set('s', s);
	const search = p.toString();
	return `${location.origin}${location.pathname}${search ? `?${search}` : ''}`;
}
