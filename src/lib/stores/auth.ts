import supabase from '$lib/helpers/db';
import type { Session } from '@supabase/supabase-js';
import { derived, writable } from 'svelte/store';
import vehiclesStore from './vehicles';
import appointmentsStore from './appointments';
import { type UserRole } from '$lib/types/auth';
import { UserRolesEnum } from '$lib/enums/auth';

export const user = writable<Session['user']['user_metadata'] | null>(null);
export const session = writable<Session | null>(null);
export const userRole = writable<UserRole>(undefined);

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
		session.set(currentSession);
		user.set(currentSession.user.user_metadata);
		userRole.set(currentSession.user.app_metadata.role);
	}

	return currentSession;
}

// Listening to auth state changes
supabase.auth.onAuthStateChange((_event, newSession) => {
	if (_event === 'SIGNED_OUT' || !newSession) {
		console.log('User signed out');
		session.set(null);
		user.set(null);
		vehiclesStore.clear();
		appointmentsStore.clear();
	}

	if ((_event === 'SIGNED_IN' || _event === 'INITIAL_SESSION') && newSession) {
		console.log('User signed in');
		session.set(newSession);
		user.set(newSession.user.user_metadata || null);
		vehiclesStore.init(newSession!.user.id);
		appointmentsStore.init();
	}
});
