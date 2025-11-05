import { loadTranslations, supportedLocalesOptions } from '$lib/translations/';

export const ssr = false;
export const csr = true;
export const prerender = false;

loadTranslations(supportedLocalesOptions[0].value);
