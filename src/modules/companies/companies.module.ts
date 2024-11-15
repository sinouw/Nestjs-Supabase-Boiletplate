import { Module } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { PaginationService } from 'src/common/services/pagination.service';
import { CompaniesController } from './companies.controller';

@Module({
  controllers: [CompaniesController],
  providers: [CompaniesService, PaginationService],
  exports: [CompaniesService],
})
export class CompaniesModule {}
