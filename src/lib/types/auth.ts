import type { UserRolesEnum } from '$lib/enums/auth';
import type { UserAttributes } from '@supabase/supabase-js';

export type UserEditPayload = Partial<UserAttributes>;
export type VerificationType = 'sms' | 'email' | 'phone_change' | 'email_change';
export interface UserMetaData {
	firstName: string;
	lastName: string;
	email: string;
	phone: string;
}
export type UserRole = UserRolesEnum;
