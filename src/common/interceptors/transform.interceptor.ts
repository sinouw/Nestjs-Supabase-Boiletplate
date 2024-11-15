import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiResponse, PaginatedApiResponse } from '../types/api-response.types';

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, ApiResponse<T> | PaginatedApiResponse<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ApiResponse<T> | PaginatedApiResponse<T>> {
    const request = context.switchToHttp().getRequest();

    return next.handle().pipe(
      map((data) => {
        const response: ApiResponse<T> = {
          success: true,
          data: data?.data || data,
          error: null,
          timestamp: new Date().toISOString(),
          path: request.url,
        };

        // Handle paginated responses
        if (data?.pagination) {
          return {
            ...response,
            pagination: data.pagination,
          };
        }

        return response;
      }),
    );
  }
}
