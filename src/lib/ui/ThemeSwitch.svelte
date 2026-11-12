<script lang="ts">
	import { setTheme, theme, type ThemeChoice } from '#lib/theme.svelte.ts';
	import Segmented from './controls/Segmented.svelte';

	const options: { value: ThemeChoice; label: string }[] = [
		{ value: 'system', label: 'Auto' },
		{ value: 'light', label: 'Light' },
		{ value: 'dark', label: 'Dark' }
	];
</script>

<Segmented label="Color theme" {options} value={theme.choice} onchange={setTheme} />
