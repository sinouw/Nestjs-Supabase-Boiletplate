import { Module } from '@nestjs/common';
import { AddressesController } from './addresses.controller';
import { AddressesService } from './addresses.service';
import { PaginationService } from 'src/common/services/pagination.service';

@Module({
  controllers: [AddressesController],
  providers: [AddressesService, PaginationService],
  exports: [AddressesService],
})
export class AddressesModule {}
