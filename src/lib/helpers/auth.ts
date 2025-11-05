import supabase from '$lib/db';

export async function signIn(email: string, password: string) {
	const { data, error } = await supabase.auth.signInWithPassword({
		email,
		password
	});

	if (error) {
		console.error('Sign in error:', error.message);
		return null;
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

export async function sendOTP(email: string) {
	const { data, error } = await supabase.auth.signInWithOtp({
		email,
		options: { shouldCreateUser: true }
	});

	if (error) {
		console.error('Sign up error:', error.message);
		return null;
	}

	return data.user;
}

export async function verifyOTP(email: string, token: string) {
	const { data, error } = await supabase.auth.verifyOtp({
		email,
		token,
		type: 'email'
	});

	if (error) {
		console.error('Verify OTP error:', error.message);
		return null;
	}

	return data.user;
}

export async function signOut() {
	const { error } = await supabase.auth.signOut();

	if (error) {
		console.error('Sign out error:', error.message);
	}
}
