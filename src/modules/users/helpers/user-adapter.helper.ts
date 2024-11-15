import { User } from '../entities/user.entity';
import { User as SupabaseUser } from '@supabase/supabase-js';
import { adaptSupabaseEntity } from '../../../common/helpers/supabase-adapter.helper';

export function adaptSupabaseUser(supabaseUser: SupabaseUser): User {
  return adaptSupabaseEntity<User>(supabaseUser);
}
