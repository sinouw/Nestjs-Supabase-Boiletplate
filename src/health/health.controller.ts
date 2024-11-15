import { Controller, Get } from '@nestjs/common';
import {
  HealthCheck,
  HealthCheckService,
  HttpHealthIndicator,
  MemoryHealthIndicator,
} from '@nestjs/terminus';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { PrismaHealthIndicator } from './indicators/prisma.health';

@ApiTags('Health')
@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private http: HttpHealthIndicator,
    private memory: MemoryHealthIndicator,
    private prismaHealth: PrismaHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  @ApiOperation({ summary: 'Check system health' })
  check() {
    return this.health.check([
      // Database health check
      () => this.prismaHealth.isHealthy('database'),

      // API health check
      () => this.http.pingCheck('nestjs-docs', 'https://docs.nestjs.com'),

      // Memory health check
      () => this.memory.checkHeap('memory_heap', 150 * 1024 * 1024), // 150MB
      () => this.memory.checkRSS('memory_rss', 150 * 1024 * 1024), // 150MB
    ]);
  }
}
