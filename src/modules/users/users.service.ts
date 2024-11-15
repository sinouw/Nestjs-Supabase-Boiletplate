import { Injectable } from '@nestjs/common';
import { SupabaseService } from 'src/infrastructure/supabase/supabase.service';
import { PaginationService } from 'src/common/services/pagination.service';
import {
  PaginationParams,
  SortParams,
} from 'src/common/types/api-pagination.types';
import { User as SupabaseUser, User } from '@supabase/supabase-js';
import { adaptSupabaseUser } from './helpers/user-adapter.helper';
import { PaginatedApiResponse } from 'src/common/types/api-response.types';
import { CustomLoggerService } from 'src/common/services/logger.service';

@Injectable()
export class UsersService {
  private readonly logger = new CustomLoggerService(UsersService.name);

  constructor(
    private readonly supabaseService: SupabaseService,
    private readonly paginationService: PaginationService,
  ) {}

  async findAll(
    params?: PaginationParams & SortParams,
  ): Promise<PaginatedApiResponse<User[]>> {
    try {
      this.logger.log('Fetching all users with pagination');
      this.logger.debug('Pagination params:', params);

      const paginationParams =
        this.paginationService.getPaginationParams(params);
      const sortParams = this.paginationService.getSortParams(params);

      const { data, error } = await this.supabaseService
        .getAdminClient()
        .auth.admin.listUsers({
          page: paginationParams.page - 1,
          perPage: paginationParams.perPage,
        });

      if (error) {
        this.logger.error('Error fetching users:', error);
        throw error;
      }

      const adaptedUsers = data.users.map((user) => adaptSupabaseUser(user));
      this.logger.log(`Successfully fetched ${adaptedUsers.length} users`);

      return this.paginationService.paginateData(
        adaptedUsers,
        paginationParams,
        sortParams,
        '/users',
      );
    } catch (error) {
      this.logger.error('Failed to fetch users:', error);
      throw error;
    }
  }

  async findOne(id: string): Promise<User | null> {
    const { data, error } = await this.supabaseService
      .getAdminClient()
      .auth.admin.getUserById(id);
    if (error) throw error;
    return data.user ? adaptSupabaseUser(data.user) : null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const { data, error } = await this.supabaseService
      .getAdminClient()
      .auth.admin.listUsers();
    if (error) throw error;

    const user = data.users.find((user: SupabaseUser) => user.email === email);
    return user ? adaptSupabaseUser(user) : null;
  }

  async update(id: string, data: Partial<User>) {
    const { data: updatedUser, error } = await this.supabaseService
      .getAdminClient()
      .auth.admin.updateUserById(id, {
        user_metadata: data.user_metadata,
      });
    if (error) throw error;
    return adaptSupabaseUser(updatedUser.user);
  }

  async banUser(id: string) {
    const { data: bannedUser, error: banError } = await this.supabaseService
      .getAdminClient()
      .auth.admin.updateUserById(id, {
        user_metadata: { is_banned: true },
      });
    if (banError) throw banError;

    const adaptedUser = adaptSupabaseUser(bannedUser.user);
    return { ...adaptedUser, message: 'User banned successfully' };
  }

  async unbanUser(id: string) {
    const { data: unbannedUser, error: unbanError } = await this.supabaseService
      .getAdminClient()
      .auth.admin.updateUserById(id, {
        user_metadata: { is_banned: false },
      });
    if (unbanError) throw unbanError;

    const adaptedUser = adaptSupabaseUser(unbannedUser.user);
    return { ...adaptedUser, message: 'User unbanned successfully' };
  }

  async delete(id: string) {
    const { error } = await this.supabaseService
      .getAdminClient()
      .auth.admin.deleteUser(id);
    if (error) throw error;
    return { success: true };
  }
}
