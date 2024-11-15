import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import { swaggerConfig } from './config/swagger.config';
import { ValidationPipe } from '@nestjs/common';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { CustomLoggerService } from './common/services/logger.service';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import fastifySwagger from '@fastify/swagger';
import { OpenAPIV3 } from 'openapi-types';

declare const module: any;

async function bootstrap() {
  // Create Fastify instance
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    {
      logger: ['error', 'warn', 'log', 'debug', 'verbose'],
    },
  );

  const logger = app.get(CustomLoggerService);

  // Apply global interceptors
  app.useGlobalInterceptors(
    new LoggingInterceptor(logger),
    new TransformInterceptor(),
  );

  // Enable validation pipes
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );

  // Setup Swagger
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  await app.register(fastifySwagger, {
    mode: 'static',
    specification: {
      document: document as OpenAPIV3.Document,
    },
  });
  SwaggerModule.setup('api/docs', app, document);

  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(3000, '0.0.0.0');

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
