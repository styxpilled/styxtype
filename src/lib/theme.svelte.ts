import { browser } from '$app/env';

export type ThemeChoice = 'system' | 'light' | 'dark';

// Keep in sync with the inline script in app.html.
const KEY = 'styxtype-theme';

function read(): ThemeChoice {
	try {
		const value = localStorage.getItem(KEY);
		if (value === 'light' || value === 'dark') return value;
	} catch {
		// Storage can be blocked.
	}
	return 'system';
}

export const theme = $state<{ choice: ThemeChoice }>({ choice: browser ? read() : 'system' });

export function setTheme(choice: ThemeChoice) {
	theme.choice = choice;
	const root = document.documentElement;
	if (choice === 'system') delete root.dataset.theme;
	else root.dataset.theme = choice;
	try {
		if (choice === 'system') localStorage.removeItem(KEY);
		else localStorage.setItem(KEY, choice);
	} catch {
		// Storage can be blocked.
	}
}
