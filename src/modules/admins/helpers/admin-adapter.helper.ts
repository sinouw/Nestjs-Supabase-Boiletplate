import { Admin } from '../entities/admin.entity';
import { User as SupabaseUser } from '@supabase/supabase-js';
import { adaptSupabaseEntity } from '../../../common/helpers/supabase-adapter.helper';

export function adaptSupabaseAdmin(supabaseUser: SupabaseUser): Admin {
  return adaptSupabaseEntity<Admin>(supabaseUser);
}
