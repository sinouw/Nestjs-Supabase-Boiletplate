import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { FastifyReply } from 'fastify';
import { ApiResponse } from '../types/api-response.types';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<FastifyReply>();
    const request = ctx.getRequest();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const errorResponse: ApiResponse<null> = {
      success: false,
      data: null,
      error: exception.message || 'Internal server error',
      timestamp: new Date().toISOString(),
      path: request.url,
    };

    response.status(status).send(errorResponse);
  }
}
