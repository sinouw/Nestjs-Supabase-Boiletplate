import { Module } from '@nestjs/common';
import { AdminUsersController } from './users.controller';
import { UsersService } from './users.service';
import { PaginationService } from 'src/common/services/pagination.service';

@Module({
  controllers: [AdminUsersController],
  providers: [UsersService, PaginationService],
  exports: [UsersService],
})
export class UsersModule {}
