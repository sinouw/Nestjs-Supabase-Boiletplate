import { Logger } from '@nestjs/common';
import { SupabaseService } from '../../infrastructure/supabase/supabase.service';
import { PaginationService } from './pagination.service';
import { IGenericPaginationService } from '../controllers/generic-admin.controller';
import { PaginatedApiResponse } from '../types/api-response.types';
import { ListQueryParams } from '../types/api-pagination.types';

export abstract class BaseAdminService<
  T,
  CreateDto = Partial<T>,
  UpdateDto = Partial<T>,
> implements IGenericPaginationService<T, CreateDto, UpdateDto>
{
  protected abstract readonly tableName: string;
  protected readonly logger: Logger;

  constructor(
    protected readonly supabaseService: SupabaseService,
    protected readonly paginationService: PaginationService,
    serviceName: string,
  ) {
    this.logger = new Logger(serviceName);
  }

  async list(params: ListQueryParams): Promise<PaginatedApiResponse<T[]>> {
    try {
      const query = this.supabaseService
        .getClient()
        .from(this.tableName)
        .select('*', { count: 'exact' });

      if (params.search) {
        // Implement search logic here based on your requirements
      }

      const paginationParams =
        this.paginationService.getPaginationParams(params);
      const sortParams = this.paginationService.getSortParams(params);

      // Get total count before pagination
      const { count: totalCount, error: countError } = await query;

      if (countError) {
        throw countError;
      }

      // Apply sorting and pagination
      query.order(sortParams.sortBy, {
        ascending: sortParams.ascending,
      });

      const from = (paginationParams.page - 1) * paginationParams.perPage;
      const to = from + paginationParams.perPage - 1;
      query.range(from, to);

      // Execute query
      const { data, error } = await query;

      if (error) {
        throw error;
      }

      return {
        success: true,
        data,
        error: null,
        timestamp: new Date().toISOString(),
        path: `/${this.tableName}`,
        pagination: {
          total: totalCount,
          page: paginationParams.page,
          perPage: paginationParams.perPage,
          totalPages: Math.ceil(totalCount / paginationParams.perPage),
        },
      };
    } catch (error) {
      this.logger.error(`Error listing ${this.tableName}:`, error);
      throw error;
    }
  }

  async get(id: string): Promise<T> {
    const { data, error } = await this.supabaseService
      .getAdminClient()
      .from(this.tableName)
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      this.logger.error(`Error getting ${this.tableName}:`, error);
      throw error;
    }

    return data;
  }

  async create(dto: CreateDto): Promise<T> {
    const { data, error } = await this.supabaseService
      .getAdminClient()
      .from(this.tableName)
      .insert(dto)
      .select('*')
      .single();

    if (error) {
      this.logger.error(`Error creating ${this.tableName}:`, error);
      throw error;
    }

    return data;
  }

  async update(id: string, dto: UpdateDto): Promise<T> {
    const { data, error } = await this.supabaseService
      .getAdminClient()
      .from(this.tableName)
      .update(dto)
      .eq('id', id)
      .select('*')
      .single();

    if (error) {
      this.logger.error(`Error updating ${this.tableName}:`, error);
      throw error;
    }

    return data;
  }

  async delete(id: string): Promise<void> {
    const { error } = await this.supabaseService
      .getAdminClient()
      .from(this.tableName)
      .delete()
      .eq('id', id);

    if (error) {
      this.logger.error(`Error deleting ${this.tableName}:`, error);
      throw error;
    }
  }
}
