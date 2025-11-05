import supabase from '$lib/db';
import type { Session } from '@supabase/supabase-js';
import { writable } from 'svelte/store';
import vehiclesStore from './vehicles';
import appointmentsStore from './appointments';

export const user = writable<Session['user'] | null>(null);
export const session = writable<Session | null>(null);

// Getting initial session state
supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
	if (currentSession) {
		session.set(currentSession);
		user.set(currentSession?.user);
	}
});

// Listening to auth state changes
supabase.auth.onAuthStateChange((_event, newSession) => {
	if (_event === 'SIGNED_OUT') {
		console.log('User signed out');
		vehiclesStore.clear();
		appointmentsStore.clear();
	}

	if (_event === 'SIGNED_IN' || _event === 'INITIAL_SESSION') {
		vehiclesStore.init(newSession!.user.id);
		appointmentsStore.init();
	}

	session.set(newSession);
	user.set(newSession?.user || null);
});
