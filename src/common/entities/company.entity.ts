export interface Company {
  id: string;
  name: string;
  description?: string;
  website?: string;
  logo_url?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  postal_code?: string;
  phone?: string;
  email?: string;
  is_active: boolean;
  created_by: string;
  created_at: Date;
  updated_at: Date;
  // Relations
  user_id?: string;
}

export interface CreateCompanyDto {
  name: string;
  description?: string;
  website?: string;
  logo_url?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  postal_code?: string;
  phone?: string;
  email?: string;
}

export interface UpdateCompanyDto extends Partial<CreateCompanyDto> {
  is_active?: boolean;
}
