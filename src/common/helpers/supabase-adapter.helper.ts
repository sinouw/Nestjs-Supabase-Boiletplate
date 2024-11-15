import { User as SupabaseUser } from '@supabase/supabase-js';

export interface BaseSupabaseEntity {
  id: string;
  email: string;
  phone: string | null;
  created_at: string;
  updated_at: string;
  last_sign_in_at: string;
  confirmed_at: string;
  email_confirmed_at: string;
  phone_confirmed_at: string;
  user_metadata: {
    role?: string;
    full_name?: string;
    phone?: string;
    email_verified?: boolean;
    phone_verified?: boolean;
    gender?: string;
    birthdate?: string;
    is_banned?: boolean;
    username?: string;
    picture?: string;
  };
  app_metadata: {
    provider?: string;
    providers?: string[];
  };
  aud: string;
  role: string;
}

export function adaptSupabaseEntity<T extends BaseSupabaseEntity>(
  supabaseUser: SupabaseUser,
): T {
  return {
    id: supabaseUser.id,
    email: supabaseUser.email || '',
    phone: supabaseUser.phone,
    created_at: supabaseUser.created_at,
    updated_at: supabaseUser.updated_at,
    last_sign_in_at: supabaseUser.last_sign_in_at,
    confirmed_at: supabaseUser.confirmed_at,
    email_confirmed_at: supabaseUser.email_confirmed_at,
    phone_confirmed_at: supabaseUser.phone_confirmed_at,
    user_metadata: {
      role: supabaseUser.user_metadata?.role,
      full_name: supabaseUser.user_metadata?.full_name,
      phone: supabaseUser.user_metadata?.phone,
      email_verified: supabaseUser.user_metadata?.email_verified,
      phone_verified: supabaseUser.user_metadata?.phone_verified,
      gender: supabaseUser.user_metadata?.gender,
      birthdate: supabaseUser.user_metadata?.birthdate,
      is_banned: supabaseUser.user_metadata?.is_banned,
      username: supabaseUser.user_metadata?.username,
      picture: supabaseUser.user_metadata?.picture,
    },
    app_metadata: {
      provider: supabaseUser.app_metadata?.provider,
      providers: supabaseUser.app_metadata?.providers,
    },
    aud: supabaseUser.aud,
    role: supabaseUser.role,
  } as T;
}
