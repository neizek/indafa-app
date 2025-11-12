import { goto } from '$app/navigation';
import { resolve } from '$app/paths';
import { ROUTES } from '$lib/constants/routes.js';
import { callToLoginPopUp } from '$lib/helpers/auth';
import storage from '$lib/helpers/storage.js';
import { initSession, isAdmin, isOperator } from '$lib/stores/auth';
import { previousUrl } from '$lib/stores/navigation.js';
import { loadTranslations, supportedLocalesOptions } from '$lib/translations/translations';
import { get } from 'svelte/store';

export const ssr = false;
export const csr = true;
export const prerender = false;

const savedLocale = storage.get<string>('locale');

loadTranslations(savedLocale ?? supportedLocalesOptions[0].value);

const adminRoutes = [ROUTES.ADMIN.DASHBOARD, ROUTES.ADMIN.OFFERS];
const operatorRoutes = [ROUTES.OPERATOR];
const protectedRoutes = [
	...adminRoutes,
	...operatorRoutes,
	ROUTES.USER.PROFILE,
	ROUTES.APPOINTMENT
];

export async function load(page) {
	const needsAuth = protectedRoutes.some((route) => page.url.pathname.startsWith(route as string));
	const operatorsOnly = operatorRoutes.some((route) =>
		page.url.pathname.startsWith(route as string)
	);
	const adminsOnly = adminRoutes.some((route) => page.url.pathname.startsWith(route as string));

	const session = await initSession();

	if (needsAuth && !session) {
		const navigateToLink = get(previousUrl) ?? ROUTES.HOME;

		await goto(resolve(navigateToLink), { replaceState: true });
		callToLoginPopUp();
	}

	if (operatorsOnly && !get(isOperator) && !get(isAdmin)) {
		goto(resolve(ROUTES.HOME));
	}

	if (adminsOnly && !get(isAdmin)) {
		goto(resolve(ROUTES.HOME));
	}
}
