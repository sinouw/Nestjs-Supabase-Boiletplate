import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { HttpModule } from '@nestjs/axios';
import { PrismaHealthIndicator } from './indicators/prisma.health';
import { HealthController } from './health.controller';
import { PrismaModule } from 'src/infrastructure/prisma/prisma.module';

@Module({
  imports: [TerminusModule, HttpModule, PrismaModule],
  controllers: [HealthController],
  providers: [PrismaHealthIndicator],
})
export class HealthModule {}
