import { Injectable, Logger } from '@nestjs/common';
import { Plan, UserPlan } from 'src/modules/plans/entities/plan.entity';
import { CreatePlanDto } from './dto/create-plan.dto';
import { BaseAdminService } from 'src/common/services/generic-admin.service';
import { SupabaseService } from 'src/infrastructure/supabase/supabase.service';
import { PaginationService } from 'src/common/services/pagination.service';

@Injectable()
export class PlansService extends BaseAdminService<Plan, CreatePlanDto> {
  protected readonly tableName = 'Plan';
  protected readonly logger = new Logger(PlansService.name);

  constructor(
    protected readonly supabaseService: SupabaseService,
    protected readonly paginationService: PaginationService,
  ) {
    super(supabaseService, paginationService, PlansService.name);
  }

  // User Plan specific methods
  async assignPlanToUser(userId: string, planId: string): Promise<UserPlan> {
    try {
      this.logger.log(`Assigning plan ${planId} to user ${userId}`);
      const plan = await this.get(planId);
      if (!plan) {
        this.logger.error(`Plan not found: ${planId}`);
        throw new Error('Plan not found');
      }

      const startDate = new Date();
      const trialEndDate = plan.trial_days
        ? new Date(startDate.getTime() + plan.trial_days * 24 * 60 * 60 * 1000)
        : null;

      const { data, error } = await this.supabaseService
        .getClient()
        .from('user_plans')
        .insert({
          user_id: userId,
          plan_id: planId,
          status: 'active',
          start_date: startDate.toISOString(),
          end_date: null,
          trial_end_date: trialEndDate?.toISOString(),
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (error) {
        this.logger.error(`Error assigning plan: ${error.message}`);
        throw error;
      }

      this.logger.log(`Successfully assigned plan ${planId} to user ${userId}`);
      return data;
    } catch (error) {
      this.logger.error(
        `Failed to assign plan ${planId} to user ${userId}:`,
        error,
      );
      throw error;
    }
  }

  async getUserPlan(userId: string): Promise<UserPlan | null> {
    const { data, error } = await this.supabaseService
      .getClient()
      .from('user_plans')
      .select('*, plans(*)')
      .eq('user_id', userId)
      .eq('status', 'active')
      .single();

    if (error) throw error;
    return data;
  }

  async cancelUserPlan(userId: string): Promise<UserPlan> {
    const { data, error } = await this.supabaseService
      .getClient()
      .from('user_plans')
      .update({
        status: 'cancelled',
        cancelled_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq('user_id', userId)
      .eq('status', 'active')
      .select()
      .single();

    if (error) throw error;
    return data;
  }
}
