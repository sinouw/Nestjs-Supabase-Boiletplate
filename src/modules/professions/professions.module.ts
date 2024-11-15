import { Module } from '@nestjs/common';
import { ProfessionsController } from './professions.controller';
import { ProfessionsService } from './professions.service';
import { PaginationService } from 'src/common/services/pagination.service';

@Module({
  controllers: [ProfessionsController],
  providers: [ProfessionsService, PaginationService],
  exports: [ProfessionsService],
})
export class ProfessionsModule {}
