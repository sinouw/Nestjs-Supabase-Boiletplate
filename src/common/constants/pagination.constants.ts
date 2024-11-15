export enum PaginationSortFields {
  CREATED_AT = 'created_at',
}

export const PAGINATION_CONSTANTS = {
  DEFAULT_PAGE: 1,
  DEFAULT_PER_PAGE: 10,
  DEFAULT_SORT_BY: PaginationSortFields.CREATED_AT,
  DEFAULT_SORT_ASCENDING: false,
} as const;
