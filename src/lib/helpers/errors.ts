import type { PostgrestError } from '@supabase/supabase-js';

export function getErrorMessage(error: PostgrestError | null | undefined): string {
	if (!error) return 'An unexpected error occurred';

	// PostgreSQL error codes to user-friendly messages
	const errorMessages: Record<string, string> = {
		// Authentication errors
		invalid_credentials: 'Invalid email or password',
		email_not_confirmed: 'Please verify your email address',
		user_already_exists: 'An account with this email already exists',

		// Database constraint errors
		'23505': 'This record already exists',
		'23503': 'Cannot delete: related records exist',
		'23502': 'Required field is missing',
		'23514': 'Invalid data provided',

		// Foreign key violations
		foreign_key_violation: 'Cannot complete action: related data is missing',

		// Permission errors
		'42501': 'You do not have permission to perform this action',
		PGRST301: 'Permission denied',

		// Not found
		PGRST116: 'Record not found',

		// Network/connection errors
		FetchError: 'Network error. Please check your connection'
	};

	// Check for specific error code
	if (error.code && errorMessages[error.code]) {
		return errorMessages[error.code];
	}

	// Check error message for patterns
	if (error.message.includes('duplicate key')) {
		return 'This item already exists';
	}

	if (error.message.includes('violates foreign key constraint')) {
		return 'Cannot complete action: related data is required';
	}

	if (error.message.includes('permission denied')) {
		return 'You do not have permission to perform this action';
	}

	// Development mode: show actual error
	if (import.meta.env.DEV) {
		console.error('Supabase error:', error);
		return `Error: ${error.message}`;
	}

	// Production: generic message
	return 'Something went wrong. Please try again later';
}
