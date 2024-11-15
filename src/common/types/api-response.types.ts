export interface ApiResponse<T> {
  success: boolean;
  data: T | null;
  error: string | null;
  timestamp: string;
  path: string;
}

export interface PaginatedApiResponse<T> extends ApiResponse<T> {
  pagination: {
    total: number;
    page: number;
    perPage: number;
    totalPages: number;
  };
}
