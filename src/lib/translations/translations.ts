import storage from '$lib/helpers/storage';
import type { SelectOption } from '$lib/types/ui';
import i18n, { type Config } from 'sveltekit-i18n';

const modules = import.meta.glob<{ default: Record<string, string> }>('./*.json');

interface SupportedLocaleOption extends SelectOption {
	value: string;
}

export const supportedLocalesOptions: SupportedLocaleOption[] = [
	{ value: 'en', label: 'English' },
	{ value: 'lv', label: 'Latviešu' },
	{ value: 'ru', label: 'Русский' }
];

const config: Config = {
	loaders: supportedLocalesOptions.map((locale) => ({
		locale: locale.value,
		key: 'common',
		loader: async () => {
			const mod = await modules[`./${locale.value}.json`]();
			return mod.default;
		}
	})),
	fallbackLocale: 'en'
};

export const switchLocale = (newLocale: string) => {
	locale.set(newLocale);
	storage.set('locale', newLocale);
};

export const { t, locale, locales, loading, loadTranslations } = new i18n(config);
