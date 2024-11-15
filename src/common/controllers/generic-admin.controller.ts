import { Get, Query, Param, Delete, Post, Put, Body } from '@nestjs/common';
import { ListQueryParams } from '../types/api-pagination.types';
import { PaginatedApiResponse } from '../types/api-response.types';
import { ApiOperation, ApiQuery } from '@nestjs/swagger';
import { PaginationSortFields } from '../constants/pagination.constants';

export interface IGenericPaginationService<T, CreateDto, UpdateDto> {
  list(query: ListQueryParams): Promise<PaginatedApiResponse<T[]>>;
  create(dto: CreateDto, userId: string): Promise<T>;
  update(id: string, dto: UpdateDto): Promise<T>;
  get(id: string): Promise<T>;
  delete(id: string): Promise<void>;
}

export class GenericPaginationController<T, CreateDto, UpdateDto> {
  constructor(
    private readonly service: IGenericPaginationService<
      T,
      CreateDto,
      UpdateDto
    >,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get paginated list of items' })
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
    enum: [PaginationSortFields.CREATED_AT],
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
  async list(
    @Query() query: ListQueryParams,
  ): Promise<PaginatedApiResponse<T[]>> {
    return this.service.list({
      page: typeof query.page === 'string' ? parseInt(query.page) : query.page,
      perPage:
        typeof query.perPage === 'string'
          ? parseInt(query.perPage)
          : query.perPage,
      sortBy: query.sortBy,
      ascending:
        typeof query.ascending === 'string'
          ? query.ascending === 'true'
          : query.ascending,
    });
  }

  @Post()
  @ApiOperation({ summary: 'Create new item' })
  async create(@Body() dto: CreateDto, userId: string): Promise<T> {
    return this.service.create(dto, userId);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update item by ID' })
  async update(@Param('id') id: string, @Body() dto: UpdateDto): Promise<T> {
    return this.service.update(id, dto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get item by ID' })
  async get(@Param('id') id: string): Promise<T> {
    return this.service.get(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete item by ID' })
  async delete(@Param('id') id: string): Promise<void> {
    return this.service.delete(id);
  }
}
