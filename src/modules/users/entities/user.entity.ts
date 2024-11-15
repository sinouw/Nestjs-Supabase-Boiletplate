import { BaseSupabaseEntity } from '../../../common/helpers/supabase-adapter.helper';

export interface User extends BaseSupabaseEntity {
  // Add any user-specific properties here
  auditLog: {
    action: string;
    timestamp: string;
    details: string;
  }[];
}
