import {
  Controller,
  Post,
  Get,
  Param,
  UseGuards,
  BadRequestException,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiOperation } from '@nestjs/swagger';
import { CompaniesService } from './companies.service';
import { SupabaseGuard } from 'src/common/guards/supabase.guard';
import { RoleGuard, Roles } from 'src/common/guards/role.guard';
import { APP_ROLES } from 'src/common/constants/app.constants';
import { GenericPaginationController } from 'src/common/controllers/generic-admin.controller';
import { Company } from './entities/company.entity';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

@ApiTags('Admin / Companies')
@Controller('admin/companies')
@UseGuards(SupabaseGuard, RoleGuard)
@Roles(APP_ROLES.SUPER_ADMIN)
@ApiBearerAuth('JWT-auth')
export class CompaniesController extends GenericPaginationController<
  Company,
  CreateCompanyDto,
  UpdateCompanyDto
> {
  constructor(private readonly companiesService: CompaniesService) {
    super(companiesService);
  }

  @Post('users/:userId/assign/:companyId')
  @ApiOperation({ summary: 'Assign company to user' })
  async assignCompanyToUser(
    @Param('userId') userId: string,
    @Param('companyId') companyId: string,
  ) {
    try {
      return await this.companiesService.assignCompanyToUser(userId, companyId);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Get('users/:userId/company')
  @ApiOperation({ summary: "Get user's company" })
  async getUserCompany(@Param('userId') userId: string) {
    try {
      return await this.companiesService.getUserCompany(userId);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
