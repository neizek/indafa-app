export const ROUTES = {
	HOME: '/',
	MAP: '/map',
	APPOINTMENT: '/appointment',
	USER: {
		PROFILE: '/user/profile'
	}
} as const;

export type Route = (typeof ROUTES)[keyof typeof ROUTES];
