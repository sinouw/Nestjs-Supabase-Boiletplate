import {
  Controller,
  Post,
  Get,
  Param,
  UseGuards,
  BadRequestException,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { Interest } from './entities/interest.entity';
import { CreateInterestDto } from './dto/create-interest.dto';
import { UpdateInterestDto } from './dto/update-interest.dto';
import { SupabaseGuard } from 'src/common/guards/supabase.guard';
import { RoleGuard, Roles } from 'src/common/guards/role.guard';
import { APP_ROLES } from 'src/common/constants/app.constants';
import { GenericPaginationController } from 'src/common/controllers/generic-admin.controller';
import { InterestsService } from './interests.service';

@ApiTags('Admin / Interests')
@Controller('admin/interests')
@UseGuards(SupabaseGuard, RoleGuard)
@ApiBearerAuth('JWT-auth')
@Roles(APP_ROLES.SUPER_ADMIN)
export class InterestsController extends GenericPaginationController<
  Interest,
  CreateInterestDto,
  UpdateInterestDto
> {
  constructor(private readonly interestsService: InterestsService) {
    super(interestsService);
  }

  @Post('users/:userId/assign/:interestId')
  @ApiOperation({ summary: 'Assign interest to user' })
  async assignInterestToUser(
    @Param('userId') userId: string,
    @Param('interestId') interestId: string,
  ) {
    try {
      return await this.interestsService.assignInterestToUser(
        userId,
        interestId,
      );
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Get('users/:userId/interests')
  @ApiOperation({ summary: "Get user's interests" })
  async getUserInterests(@Param('userId') userId: string) {
    try {
      return await this.interestsService.getUserInterests(userId);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
