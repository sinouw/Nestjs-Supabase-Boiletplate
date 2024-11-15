import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseGuards,
  Query,
  BadRequestException,
} from '@nestjs/common';
import { Admin } from './entities/admin.entity';
import { SupabaseGuard } from 'src/common/guards/supabase.guard';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiResponse,
} from '@nestjs/swagger';
import {
  PAGINATION_CONSTANTS,
  PaginationSortFields,
} from 'src/common/constants/pagination.constants';
import { APP_ROLES } from 'src/common/constants/app.constants';
import { AdminsService } from './admins.service';
import { RoleGuard, Roles } from 'src/common/guards/role.guard';

@ApiTags('Admin / Admins')
@Controller('admin/admins')
@UseGuards(SupabaseGuard, RoleGuard)
@Roles(APP_ROLES.SUPER_ADMIN)
@ApiBearerAuth('JWT-auth')
export class AdminsController {
  constructor(private readonly adminsService: AdminsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all admin users' })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: 'Page number',
    example: 1,
  })
  @ApiQuery({
    name: 'perPage',
    required: false,
    type: Number,
    description: 'Number of items per page',
    example: 10,
  })
  @ApiQuery({
    name: 'sortBy',
    required: false,
    enum: PaginationSortFields,
    description: 'Sort by field',
    example: PaginationSortFields.CREATED_AT,
  })
  @ApiQuery({
    name: 'ascending',
    required: false,
    type: Boolean,
    description: 'Sort by ascending',
    example: true,
  })
  async findAll(
    @Query('page') page: number = PAGINATION_CONSTANTS.DEFAULT_PAGE,
    @Query('perPage') perPage: number = PAGINATION_CONSTANTS.DEFAULT_PER_PAGE,
    @Query('sortBy')
    sortBy: PaginationSortFields = PAGINATION_CONSTANTS.DEFAULT_SORT_BY,
    @Query('ascending')
    ascending: boolean = PAGINATION_CONSTANTS.DEFAULT_SORT_ASCENDING,
  ) {
    try {
      return await this.adminsService.findAll({
        page: typeof page === 'string' ? parseInt(page) : page,
        perPage: typeof perPage === 'string' ? parseInt(perPage) : perPage,
        sortBy,
        ascending:
          typeof ascending === 'string' ? ascending === 'true' : ascending,
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Post()
  @ApiOperation({ summary: 'Create new admin user' })
  @ApiResponse({ status: 201, description: 'Admin created successfully' })
  async create(
    @Body() data: { email: string; password: string; userData: Partial<Admin> },
  ) {
    try {
      return await this.adminsService.createAdmin(
        data.email,
        data.password,
        data.userData,
      );
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get admin by id' })
  @ApiResponse({ status: 200, description: 'Returns an admin user' })
  async findOne(@Param('id') id: string) {
    try {
      const admin = await this.adminsService.findOne(id);
      if (!admin) {
        throw new BadRequestException('Admin not found');
      }
      return admin;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update admin user' })
  @ApiResponse({ status: 200, description: 'Admin updated successfully' })
  async update(@Param('id') id: string, @Body() data: Partial<Admin>) {
    try {
      return await this.adminsService.update(id, data);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete admin user' })
  @ApiResponse({ status: 200, description: 'Admin deleted successfully' })
  async delete(@Param('id') id: string) {
    try {
      await this.adminsService.delete(id);
      return { message: 'Admin deleted successfully' };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
