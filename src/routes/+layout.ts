import { goto } from '$app/navigation';
import { resolve } from '$app/paths';
import { ROUTES } from '$lib/constants/routes.js';
import { callToLoginPopUp } from '$lib/helpers/auth';
import storage from '$lib/helpers/storage';
import { initSession, isAdmin, isOperator, session } from '$lib/stores/auth';
import { intendedUrl, previousUrl } from '$lib/stores/navigation.js';
import { loadTranslations, supportedLocalesOptions } from '$lib/translations/translations';
import { LocalNotifications } from '@capacitor/local-notifications';
import { get } from 'svelte/store';

export const ssr = false;
export const csr = true;
export const prerender = false;

const savedLocale = await storage.get<string>('locale');

loadTranslations(savedLocale ?? supportedLocalesOptions[0].value);
await initSession();

const adminRoutes = [ROUTES.ADMIN.DASHBOARD, ROUTES.ADMIN.APPOINTMENTS];
const operatorRoutes = [ROUTES.OPERATOR];
const protectedRoutes = [
	...adminRoutes,
	...operatorRoutes,
	ROUTES.USER.PROFILE,
	ROUTES.APPOINTMENT
];

export async function load(page) {
	// Permission for notifications
	LocalNotifications.checkPermissions().then((status) => {
		if (status.display === 'prompt' || status.display === 'prompt-with-rationale') {
			LocalNotifications.requestPermissions();
		}
	});

	// Route protection (Middleware)
	const needsAuth = protectedRoutes.some((route) => page.url.pathname.startsWith(route as string));
	const operatorsOnly = operatorRoutes.some((route) =>
		page.url.pathname.startsWith(route as string)
	);
	const adminsOnly = adminRoutes.some((route) => page.url.pathname.startsWith(route as string));

	if (needsAuth && !get(session)) {
		const navigateToLink = get(previousUrl) ?? ROUTES.HOME;
		intendedUrl.set(page.url);
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
