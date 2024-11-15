import { Injectable } from '@nestjs/common';
import { PaginationParams, SortParams } from '../types/api-pagination.types';
import { PAGINATION_CONSTANTS } from '../constants/pagination.constants';
import { PaginatedApiResponse } from '../types/api-response.types';

@Injectable()
export class PaginationService {
  getPaginationParams(params?: PaginationParams): Required<PaginationParams> {
    return {
      page: params?.page || PAGINATION_CONSTANTS.DEFAULT_PAGE,
      perPage: params?.perPage || PAGINATION_CONSTANTS.DEFAULT_PER_PAGE,
    };
  }

  getSortParams(params: SortParams): Required<SortParams> {
    return {
      sortBy: params?.sortBy || PAGINATION_CONSTANTS.DEFAULT_SORT_BY,
      ascending:
        params?.ascending ?? PAGINATION_CONSTANTS.DEFAULT_SORT_ASCENDING,
    };
  }

  paginateData<T>(
    data: T[],
    params: Required<PaginationParams>,
    sortParams: Required<SortParams>,
    path: string,
  ): PaginatedApiResponse<T[]> {
    // Sort the data
    const sortedData = [...data].sort((a, b) => {
      const aValue = a[sortParams.sortBy];
      const bValue = b[sortParams.sortBy];

      if (sortParams.ascending) {
        return aValue > bValue ? 1 : -1;
      }
      return aValue < bValue ? 1 : -1;
    });

    // Calculate pagination
    const start = (params.page - 1) * params.perPage;
    const end = start + params.perPage;
    const paginatedData = sortedData.slice(start, end);

    return {
      success: true,
      data: paginatedData,
      error: null,
      timestamp: new Date().toISOString(),
      path,
      pagination: {
        total: data.length,
        page: params.page,
        perPage: params.perPage,
        totalPages: Math.ceil(data.length / params.perPage),
      },
    };
  }
}
