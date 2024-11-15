export interface Address {
  id: string;
  user_id: string;
  street: string;
  city: string;
  state?: string;
  country: string;
  postal_code: string;
  is_default: boolean;
  type: string;
  created_at: string;
  updated_at: string;
}
