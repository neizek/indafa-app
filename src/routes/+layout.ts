import { goto } from '$app/navigation';
import { callToLoginPopUp } from '$lib/helpers/auth';
import { session, user } from '$lib/stores/auth';
import { previousUrl } from '$lib/stores/navigation.js';
import { loadTranslations, supportedLocalesOptions } from '$lib/translations/';
import { get } from 'svelte/store';

export const ssr = false;
export const csr = true;
export const prerender = false;

loadTranslations(supportedLocalesOptions[0].value);

const protectedRoutes = ['/user', '/appointment'];

export async function load(page) {
	const needsAuth = protectedRoutes.some((route) => page.url.pathname.startsWith(route));

	if (needsAuth && !get(user) && !get(session)) {
		const navigateToLink = get(previousUrl) ?? '/';

		goto(navigateToLink, { replaceState: true }).then(() => {
			callToLoginPopUp();
		});
	}
}
