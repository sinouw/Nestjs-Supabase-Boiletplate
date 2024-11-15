export interface PaginationParams {
  page?: number;
  perPage?: number;
}

export interface SortParams {
  sortBy?: string;
  ascending?: boolean;
}

export interface SearchParams {
  search?: string;
}

// pagination sort search params
export interface ListQueryParams
  extends PaginationParams,
    SortParams,
    SearchParams {}
