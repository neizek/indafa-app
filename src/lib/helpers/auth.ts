import OTPForm from '$lib/components/forms/OTPForm.svelte';
import SignInForm from '$lib/components/forms/SignInForm.svelte';
import supabase from '$lib/helpers/db';
import appointmentsStore from '$lib/stores/appointments';
import { createPopUp } from '$lib/stores/popUp';
import vehiclesStore from '$lib/stores/vehicles';
import type { UserEditPayload, VerificationType } from '$lib/types/auth';
import type { VerifyOtpParams } from '@supabase/supabase-js';
import storage from './storage';
import { KeyRound, Pen } from '@lucide/svelte';
import EditProfileForm from '$lib/components/forms/EditProfileForm.svelte';

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

		if (type === 'sms') {
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
		if (type === 'email' || type === 'email_change') {
			return {
				email: input,
				token,
				type
			};
		}

		if (type === 'sms' || type === 'phone_change') {
			return {
				phone: input,
				token,
				type
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

export async function getCustomerData(userId: string) {
	const { data, error } = await supabase.rpc('get_user_contact_by_id', {
		user_id: userId
	});

	if (error) {
		console.error('Sign out error:', error);
		throw error;
	}

	return data[0];
}

export function callToLoginPopUp() {
	createPopUp({
		title: 'common.authorization',
		icon: KeyRound,
		content: {
			component: SignInForm
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

export function createEditProfilePopUp() {
	createPopUp({
		title: 'Edit user',
		icon: Pen,
		content: {
			component: EditProfileForm
		}
	});
}
