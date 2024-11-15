import { Module } from '@nestjs/common';
import { AdminsService } from './admins.service';
import { AdminsController } from './admins.controller';
import { AdminSeederService } from './seeds/admin-seeder.service';
import { ConfigService } from 'src/config/config.service';

@Module({
  controllers: [AdminsController],
  providers: [AdminsService, AdminSeederService, ConfigService],
  exports: [AdminsService],
})
export class AdminsModule {}
