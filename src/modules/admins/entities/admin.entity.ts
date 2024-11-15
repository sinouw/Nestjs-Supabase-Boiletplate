import { BaseSupabaseEntity } from '../../../common/helpers/supabase-adapter.helper';

export interface Admin extends BaseSupabaseEntity {
  // Add any admin-specific properties here
  auditLog: {
    action: string;
    timestamp: string;
    details: string;
  }[];
}
