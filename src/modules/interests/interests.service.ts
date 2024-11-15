import { Injectable, Logger } from '@nestjs/common';
import { Interest, UserInterest } from './entities/interest.entity';
import { CreateInterestDto } from './dto/create-interest.dto';
import { BaseAdminService } from 'src/common/services/generic-admin.service';
import { SupabaseService } from 'src/infrastructure/supabase/supabase.service';
import { PaginationService } from 'src/common/services/pagination.service';

@Injectable()
export class InterestsService extends BaseAdminService<
  Interest,
  CreateInterestDto
> {
  protected readonly tableName = 'Interest';
  protected readonly logger = new Logger(InterestsService.name);

  constructor(
    protected readonly supabaseService: SupabaseService,
    protected readonly paginationService: PaginationService,
  ) {
    super(supabaseService, paginationService, InterestsService.name);
  }

  async assignInterestToUser(
    userId: string,
    interestId: string,
  ): Promise<UserInterest> {
    try {
      this.logger.log(`Assigning interest ${interestId} to user ${userId}`);
      const interest = await this.get(interestId);
      if (!interest) {
        this.logger.error(`Interest not found: ${interestId}`);
        throw new Error('Interest not found');
      }

      const { data, error } = await this.supabaseService
        .getClient()
        .from('user_interests')
        .insert({
          user_id: userId,
          interest_id: interestId,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (error) {
        this.logger.error(`Error assigning interest: ${error.message}`);
        throw error;
      }

      this.logger.log(
        `Successfully assigned interest ${interestId} to user ${userId}`,
      );
      return data;
    } catch (error) {
      this.logger.error(
        `Failed to assign interest ${interestId} to user ${userId}:`,
        error,
      );
      throw error;
    }
  }

  async getUserInterests(userId: string): Promise<UserInterest[]> {
    const { data, error } = await this.supabaseService
      .getClient()
      .from('user_interests')
      .select('*, interests(*)')
      .eq('user_id', userId);

    if (error) throw error;
    return data;
  }
}
