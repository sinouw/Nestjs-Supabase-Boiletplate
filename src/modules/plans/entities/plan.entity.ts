export interface Plan {
  id: string;
  name: string;
  description?: string;
  price: number;
  currency: string;
  billing_period: 'monthly' | 'yearly';
  features: string[];
  is_active: boolean;
  created_at: string;
  updated_at: string;
  trial_days?: number;
  max_users?: number;
  sort_order?: number;
}

export interface UserPlan {
  id: string;
  user_id: string;
  plan_id: string;
  status: 'active' | 'cancelled' | 'expired';
  start_date: string;
  end_date: string;
  created_at: string;
  updated_at: string;
  cancelled_at?: string;
  trial_end_date?: string;
}
