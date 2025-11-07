import type { UserAttributes } from '@supabase/supabase-js';

export type UserEditPayload = Partial<UserAttributes>;
export type VerificationType = 'phone' | 'email';
