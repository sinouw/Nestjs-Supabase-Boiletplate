import { Module } from '@nestjs/common';
import { InterestsController } from './interests.controller';
import { PaginationService } from 'src/common/services/pagination.service';
import { InterestsService } from './interests.service';
@Module({
  controllers: [InterestsController],
  providers: [InterestsService, PaginationService],
  exports: [InterestsService],
})
export class InterestsModule {}
