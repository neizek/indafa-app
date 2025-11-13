import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
	appId: 'com.teweb.indafa',
	appName: 'Indafa',
	webDir: 'build',
	server: {
		allowNavigation: ['https://*.supabase.co']
	}
};

export default config;
