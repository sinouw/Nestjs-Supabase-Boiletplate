import { Injectable } from '@nestjs/common';
import { HealthIndicator, HealthIndicatorResult } from '@nestjs/terminus';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
@Injectable()
export class PrismaHealthIndicator extends HealthIndicator {
  constructor(private readonly prismaService: PrismaService) {
    super();
  }

  async isHealthy(key: string): Promise<HealthIndicatorResult> {
    try {
      await this.prismaService.$queryRaw`SELECT 1`;
      return this.getStatus(key, true);
    } catch (e) {
      return this.getStatus(key, false, { message: e.message });
    }
  }
}
