import storage from '$lib/helpers/storage';
import { Moon, Sun } from '@lucide/svelte';
import { writable } from 'svelte/store';

export enum Theme {
	Light = 'light',
	Dark = 'dark'
}

export const themesOptions = Object.values(Theme).map((theme) => ({
	value: theme,
	label: `common.${theme}`,
	icon: theme === Theme.Dark ? Moon : Sun
}));

const isDarkThemePreffered = () =>
	window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

async function initTheme(): Promise<Theme> {
	let theme = storage.get('theme') as Theme;

	if (!theme) {
		theme = isDarkThemePreffered() ? Theme.Dark : Theme.Light;
	}

	applyTheme(theme);
	return theme;
}

export const currentTheme = writable(await initTheme());

function applyTheme(theme: Theme) {
	storage.set('theme', theme);
	document.documentElement.classList.toggle('dark', theme === Theme.Dark);
}

export function updateTheme(theme: Theme) {
	currentTheme.set(theme);
	applyTheme(theme);
}
