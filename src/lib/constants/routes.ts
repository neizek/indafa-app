export const ROUTES = {
	HOME: '/',
	MAP: '/map',
	APPOINTMENT: '/appointment',
	RULES: '/rules',
	USER: {
		PROFILE: '/user/profile'
	},
	OPERATOR: '/operator'
} as const;

export type Route = (typeof ROUTES)[keyof typeof ROUTES];
