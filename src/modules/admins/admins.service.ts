import { CustomLoggerService } from 'src/common/services/logger.service';
import { Injectable } from '@nestjs/common';
import { SupabaseService } from 'src/infrastructure/supabase/supabase.service';
import { Admin } from './entities/admin.entity';
import { APP_ROLES } from 'src/common/constants/app.constants';
import { PaginationService } from 'src/common/services/pagination.service';
import {
  PaginationParams,
  SortParams,
} from 'src/common/types/api-pagination.types';
import { User as SupabaseUser, User } from '@supabase/supabase-js';
import { adaptSupabaseAdmin } from './helpers/admin-adapter.helper';
import { PaginatedApiResponse } from 'src/common/types/api-response.types';

@Injectable()
export class AdminsService {
  constructor(
    private readonly supabaseService: SupabaseService,
    private readonly paginationService: PaginationService,
    private readonly logger: CustomLoggerService,
  ) {
    this.logger = new CustomLoggerService(AdminsService.name);
  }

  async findAll(
    params?: PaginationParams & SortParams,
  ): Promise<PaginatedApiResponse<Admin[]>> {
    const paginationParams = this.paginationService.getPaginationParams(params);
    const sortParams = this.paginationService.getSortParams(params);

    const { data, error } = await this.supabaseService
      .getAdminClient()
      .auth.admin.listUsers({
        page: paginationParams.page - 1,
        perPage: paginationParams.perPage,
      });

    if (error) throw error;

    const adminUsers = data.users.filter(
      (user: SupabaseUser) =>
        user.user_metadata?.role === APP_ROLES.SUPER_ADMIN,
    );

    const adaptedUsers = adminUsers.map((user: SupabaseUser) =>
      adaptSupabaseAdmin(user),
    );

    return this.paginationService.paginateData(
      adaptedUsers,
      paginationParams,
      sortParams,
      '/admins',
    );
  }

  async createAdmin(email: string, password: string, userData: Partial<Admin>) {
    const { data, error } = await this.supabaseService
      .getAdminClient()
      .auth.admin.createUser({
        email,
        password,
        email_confirm: true,
        user_metadata: {
          ...userData.user_metadata,
          role: APP_ROLES.SUPER_ADMIN,
        },
      });

    if (error) throw error;
    return adaptSupabaseAdmin(data.user);
  }

  async findOne(id: string): Promise<User | null> {
    const { data, error } = await this.supabaseService
      .getAdminClient()
      .auth.admin.getUserById(id);
    if (error) throw error;

    if (!data.user || data.user.user_metadata?.role !== APP_ROLES.SUPER_ADMIN) {
      return null;
    }

    return adaptSupabaseAdmin(data.user);
  }

  async update(id: string, data: Partial<User>) {
    const currentUser = await this.findOne(id);
    if (!currentUser) throw new Error('Admin not found');

    const { data: updatedUser, error } = await this.supabaseService
      .getAdminClient()
      .auth.admin.updateUserById(id, {
        user_metadata: {
          ...data.user_metadata,
          role: APP_ROLES.SUPER_ADMIN,
        },
      });

    if (error) throw error;
    return adaptSupabaseAdmin(updatedUser.user);
  }

  async delete(id: string) {
    const admin = await this.findOne(id);
    if (!admin) throw new Error('Admin not found');

    const { error } = await this.supabaseService
      .getAdminClient()
      .auth.admin.deleteUser(id);
    if (error) throw error;
    return { success: true };
  }
}
