import { goto } from '$app/navigation';
import { ROUTES } from '$lib/constants/routes.js';
import { callToLoginPopUp } from '$lib/helpers/auth';
import storage from '$lib/helpers/storage.js';
import { initSession } from '$lib/stores/auth';
import { previousUrl } from '$lib/stores/navigation.js';
import { loadTranslations, supportedLocalesOptions } from '$lib/translations/translations';
import { get } from 'svelte/store';

export const ssr = false;
export const csr = true;
export const prerender = false;

const savedLocale = storage.get<string>('locale');

loadTranslations(savedLocale ?? supportedLocalesOptions[0].value);

const protectedRoutes = ['/user', '/appointment'];

export async function load(page) {
	const needsAuth = protectedRoutes.some((route) => page.url.pathname.startsWith(route));
	const session = await initSession();

	if (needsAuth && !session) {
		const navigateToLink = get(previousUrl) ?? ROUTES.HOME;

		goto(navigateToLink, { replaceState: true }).then(() => {
			callToLoginPopUp();
		});
	}
}
