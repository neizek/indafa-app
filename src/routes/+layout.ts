import storage from '$lib/helpers/storage';
import { initSession } from '$lib/stores/auth';
import { initTheme } from '$lib/stores/theme';
import { loadTranslations, supportedLocalesOptions } from '$lib/translations/translations';
import { LocalNotifications } from '@capacitor/local-notifications';

export const ssr = false;
export const csr = true;
// Disable prerendering to avoid iOS webview hydration issues
export const prerender = false;

let initialized = false;

async function initializeApp() {
	if (initialized) return;

	console.log('getting locale');
	const savedLocale = storage.get<string>('locale');

	console.log('loading translations');
	loadTranslations(savedLocale ?? supportedLocalesOptions[0].value);
	console.log('initiating theme');
	initTheme();
	console.log('initiating session');
	await initSession();

	// Permission for notifications - only on native platforms
	try {
		const isNative = typeof window !== 'undefined' && 'capacitor' in window;
		if (isNative) {
			LocalNotifications.checkPermissions()
				.then((status) => {
					if (status.display === 'prompt' || status.display === 'prompt-with-rationale') {
						LocalNotifications.requestPermissions().catch((err) => {
							console.log('Notification permission request error:', err);
						});
					}
				})
				.catch((err) => {
					console.log('Failed to check notification permissions:', err);
				});
		}
	} catch (error) {
		console.log('Notification setup error:', error);
	}

	initialized = true;
}

export async function load() {
	// Initialize app on first load
	await initializeApp();
	// No route protection here - it causes infinite loops in load() function
	// Each goto() triggers another load() call, creating a cycle
}
