import {
  Controller,
  Get,
  Body,
  Param,
  Put,
  Delete,
  UseGuards,
  Query,
  BadRequestException,
} from '@nestjs/common';
import { User } from './entities/user.entity';
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
import { UsersService } from './users.service';
import { RoleGuard, Roles } from 'src/common/guards/role.guard';

@ApiTags('Admin / Users')
@Controller('admin/users')
@UseGuards(SupabaseGuard, RoleGuard)
@ApiBearerAuth('JWT-auth')
export class AdminUsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOperation({ summary: 'Get all users (Admin)' })
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
  @Roles(APP_ROLES.SUPER_ADMIN)
  async findAll(
    @Query('page') page: number = PAGINATION_CONSTANTS.DEFAULT_PAGE,
    @Query('perPage') perPage: number = PAGINATION_CONSTANTS.DEFAULT_PER_PAGE,
    @Query('sortBy')
    sortBy: PaginationSortFields = PAGINATION_CONSTANTS.DEFAULT_SORT_BY,
    @Query('ascending')
    ascending: boolean = PAGINATION_CONSTANTS.DEFAULT_SORT_ASCENDING,
  ) {
    try {
      return await this.usersService.findAll({
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

  @Get(':id')
  @ApiOperation({ summary: 'Get user by id (Admin)' })
  @ApiResponse({ status: 200, description: 'Returns a user' })
  async findOne(@Param('id') id: string) {
    try {
      const user = await this.usersService.findOne(id);
      if (!user) {
        throw new BadRequestException('User not found');
      }
      return user;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update user (Admin)' })
  @ApiResponse({ status: 200, description: 'User updated successfully' })
  async update(@Param('id') id: string, @Body() data: Partial<User>) {
    try {
      const user = await this.usersService.update(id, data);
      if (!user) {
        throw new BadRequestException('User not found');
      }
      return user;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete user (Admin)' })
  @ApiResponse({ status: 200, description: 'User deleted successfully' })
  async delete(@Param('id') id: string) {
    try {
      await this.usersService.delete(id);
      return { message: 'User deleted successfully' };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Put(':id/ban')
  @ApiOperation({ summary: 'Ban user (Admin)' })
  @ApiResponse({ status: 200, description: 'User banned successfully' })
  async banUser(@Param('id') id: string) {
    try {
      return await this.usersService.banUser(id);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Put(':id/unban')
  @ApiOperation({ summary: 'Unban user (Admin)' })
  @ApiResponse({ status: 200, description: 'User unbanned successfully' })
  async unbanUser(@Param('id') id: string) {
    try {
      return await this.usersService.unbanUser(id);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
