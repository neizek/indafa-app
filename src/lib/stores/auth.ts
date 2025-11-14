import supabase from '$lib/helpers/db';
import type { Session } from '@supabase/supabase-js';
import { derived, get, writable } from 'svelte/store';
import { type UserRole } from '$lib/types/auth';
import { UserRolesEnum } from '$lib/enums/auth';
import { clearUser, initUser } from '$lib/helpers/auth';

export const user = writable<Session['user'] | null>(null);
export const session = writable<Session | null>(null);
export const userRole = writable<UserRole | null>(null);

export const isAdmin = derived(userRole, ($role) => $role === UserRolesEnum.admin);
export const isOperator = derived(userRole, ($role) => $role === UserRolesEnum.operator);
export const isCustomer = derived(userRole, ($role) => $role === UserRolesEnum.customer);

export async function initSession() {
	const {
		data: { session: currentSession },
		error
	} = await supabase.auth.getSession();

	if (error) {
		console.log('Error with initiating session:', error);
		return;
	}

	if (currentSession) {
		initUser(currentSession);
	}

	return currentSession;
}

supabase.auth.onAuthStateChange((_event, newSession) => {
	if (_event === 'SIGNED_OUT' || !newSession) {
		console.log('User signed out');
		clearUser();
		return;
	}

	if ((_event === 'SIGNED_IN' || _event === 'INITIAL_SESSION') && newSession) {
		console.log('User signed in');
		if (get(session)?.access_token !== newSession.access_token) initUser(newSession);
		return;
	}
});
