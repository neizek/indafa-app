import type { Route } from '$lib/constants/routes';
import { writable } from 'svelte/store';

export const previousUrl = writable<Route | undefined>(undefined);
