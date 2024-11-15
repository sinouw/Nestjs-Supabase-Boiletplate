export interface Interest {
  id: string;
  name: string;
  label: string;
  description?: string;
  is_active: boolean;
  sort_order?: number;
  created_at: string;
  updated_at: string;
}

export interface UserInterest {
  id: string;
  user_id: string;
  interest_id: string;
  created_at: string;
  updated_at: string;
}
