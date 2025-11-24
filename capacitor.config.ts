import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
	appId: 'com.teweb.indafa',
	appName: 'Indafa',
	webDir: 'build',
	// Prevent common iOS webview issues
	server: {
		// Allow loading from all origins
		allowNavigation: ['*']
	},
	plugins: {
		LocalNotifications: {
			smallIcon: 'ic_stat_icon'
		}
	}
};

export default config;
