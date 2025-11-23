// import storage from '$lib/helpers/storage';
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

export const currentTheme = writable(isDarkThemePreffered() ? Theme.Dark : Theme.Light);

export function updateTheme(theme: Theme) {
	currentTheme.set(theme);
}
// async function initTheme(): Promise<Theme> {
// 	let theme = await storage.get<Theme | null>('theme');

// 	if (!theme) {
// 		theme = isDarkThemePreffered() ? Theme.Dark : Theme.Light;
// 	}

// 	await applyTheme(theme);
// 	return theme;
// }

// export const currentTheme = writable(await initTheme());

// async function applyTheme(theme: Theme) {
// 	const storedTheme = await storage.get<Theme | null>('theme');
// 	if (storedTheme !== theme) {
// 		await storage.set('theme', theme);
// 	}
// 	document.documentElement.classList.toggle('dark', theme === Theme.Dark);
// }

// export async function updateTheme(theme: Theme) {
// 	currentTheme.set(theme);
// 	await applyTheme(theme);
// }
