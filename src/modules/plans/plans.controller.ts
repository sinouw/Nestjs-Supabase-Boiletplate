import {
  Controller,
  Post,
  Get,
  Put,
  Param,
  UseGuards,
  BadRequestException,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { PlansService } from './plans.service';
import { Plan } from 'src/modules/plans/entities/plan.entity';
import { CreatePlanDto } from './dto/create-plan.dto';
import { UpdatePlanDto } from './dto/update-plan.dto';
import { SupabaseGuard } from 'src/common/guards/supabase.guard';
import { RoleGuard, Roles } from 'src/common/guards/role.guard';
import { APP_ROLES } from 'src/common/constants/app.constants';
import { GenericPaginationController } from 'src/common/controllers/generic-admin.controller';

@ApiTags('Admin / Plans')
@Controller('admin/plans')
@UseGuards(SupabaseGuard, RoleGuard)
@ApiBearerAuth('JWT-auth')
@Roles(APP_ROLES.SUPER_ADMIN)
export class PlansController extends GenericPaginationController<
  Plan,
  CreatePlanDto,
  UpdatePlanDto
> {
  constructor(private readonly plansService: PlansService) {
    super(plansService);
  }

  @Post('users/:userId/assign/:planId')
  @ApiOperation({ summary: 'Assign plan to user' })
  async assignPlanToUser(
    @Param('userId') userId: string,
    @Param('planId') planId: string,
  ) {
    try {
      return await this.plansService.assignPlanToUser(userId, planId);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Get('users/:userId/plan')
  @ApiOperation({ summary: "Get user's current plan" })
  async getUserPlan(@Param('userId') userId: string) {
    try {
      const userPlan = await this.plansService.getUserPlan(userId);
      if (!userPlan)
        throw new BadRequestException('No active plan found for user');
      return userPlan;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Put('users/:userId/cancel-plan')
  @ApiOperation({ summary: "Cancel user's plan" })
  async cancelUserPlan(@Param('userId') userId: string) {
    try {
      return await this.plansService.cancelUserPlan(userId);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
