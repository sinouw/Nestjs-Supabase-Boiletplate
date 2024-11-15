import { Module } from '@nestjs/common';
import {
  ConfigService,
  ConfigModule as NestConfigModule,
} from '@nestjs/config';
import configuration from './configuration';

@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
  ],
  providers: [ConfigService],
  exports: [NestConfigModule],
})
export class ConfigModule {}
