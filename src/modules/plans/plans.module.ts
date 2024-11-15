import { Module } from '@nestjs/common';
import { PlansController } from './plans.controller';
import { PlansService } from './plans.service';
import { PaginationService } from 'src/common/services/pagination.service';

@Module({
  controllers: [PlansController],
  providers: [PlansService, PaginationService],
  exports: [PlansService],
})
export class PlansModule {}
