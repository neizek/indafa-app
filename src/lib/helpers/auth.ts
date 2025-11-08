import OTPForm from '$lib/components/forms/OTPForm.svelte';
import SignInForm from '$lib/components/forms/SignInForm.svelte';
import supabase from '$lib/db';
import appointmentsStore from '$lib/stores/appointments';
import { createPopUp } from '$lib/stores/popUp';
import vehiclesStore from '$lib/stores/vehicles';
import type { UserEditPayload, VerificationType } from '$lib/types/auth';
import type { VerifyOtpParams } from '@supabase/supabase-js';
import storage from './storage';

export async function signIn(email: string, password: string) {
	const { data, error } = await supabase.auth.signInWithPassword({
		email,
		password
	});

	if (error) {
		console.error('Sign in error:', error.message);
		throw error;
	}

	return data.session;
}

export async function signUp(email: string, password: string) {
	const { data, error } = await supabase.auth.signUp({
		email,
		password
	});

	if (error) {
		console.error('Sign up error:', error.message);
		return null;
	}

	return data.user;
}

export async function sendOTP(type: VerificationType, input: string) {
	const payload = (() => {
		if (type === 'email') {
			return {
				email: input,
				options: { shouldCreateUser: true }
			};
		}

		if (type === 'phone') {
			return {
				phone: input,
				options: { shouldCreateUser: true }
			};
		}
	})();

	if (!payload) {
		return;
	}
	const { data, error } = await supabase.auth.signInWithOtp(payload);

	if (error) {
		console.error('Sign up error:', error.message);
		throw error;
	}

	return data.user;
}

export async function verifyOTP(type: VerificationType, input: string, token: string) {
	const payload: VerifyOtpParams | undefined = (() => {
		if (type === 'email') {
			return {
				email: input,
				token,
				type: 'email'
			};
		}

		if (type === 'phone') {
			return {
				phone: input,
				token,
				type: 'sms'
			};
		}
	})();

	if (!payload) {
		return;
	}

	const { data, error } = await supabase.auth.verifyOtp(payload);

	if (error) {
		console.error('Verify OTP error:', error.message);
		throw error;
	}

	return data.user;
}

export async function updateUser(userEditPayload: UserEditPayload) {
	const { error } = await supabase.auth.updateUser(userEditPayload);

	if (error) {
		console.error('User update error', error);
		throw error;
	}
}

export async function signOut() {
	const { error } = await supabase.auth.signOut();

	vehiclesStore.clear();
	storage.remove('vehicles');
	appointmentsStore.clear();
	storage.remove('appointments');

	if (error) {
		console.error('Sign out error:', error);
		throw error;
	}
}

export function callToLoginPopUp() {
	createPopUp({
		title: 'Login',
		content: {
			component: SignInForm,
			props: {}
		}
	});
}

export function openOTPVerificationPopUp(input: string, verificationType: VerificationType) {
	createPopUp({
		title: 'Verification',
		content: {
			component: OTPForm,
			props: {
				input,
				verificationType
			}
		}
	});
}
