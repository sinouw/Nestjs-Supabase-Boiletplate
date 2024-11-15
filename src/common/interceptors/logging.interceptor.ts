import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CustomLoggerService } from '../services/logger.service';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly logger: CustomLoggerService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const method = request.method;
    const url = request.url;
    const userId = request.user?.id;
    const startTime = Date.now();

    return next.handle().pipe(
      tap({
        next: (data) => {
          const duration = Date.now() - startTime;
          this.logger.logRequest({
            method,
            path: url,
            userId,
            duration,
            statusCode: context.switchToHttp().getResponse().statusCode,
            responseData: data,
          });
        },
        error: (error) => {
          const duration = Date.now() - startTime;
          this.logger.logError(error, {
            method,
            path: url,
            userId,
            duration,
            statusCode: error.status,
          });
        },
      }),
    );
  }
}
