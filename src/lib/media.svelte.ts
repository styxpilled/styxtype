import { MediaQuery } from 'svelte/reactivity';

// Keep in sync with the breakpoints in Shell.svelte.
export const desktop = new MediaQuery('min-width: 75rem', true);
export const mobile = new MediaQuery('max-width: 47.99rem', false);
