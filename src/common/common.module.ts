import { Module, Global } from '@nestjs/common';
import { PaginationService } from './services/pagination.service';
import { CustomLoggerService } from './services/logger.service';

@Global()
@Module({
  providers: [
    PaginationService,
    CustomLoggerService,
    {
      provide: 'Logger',
      useFactory: () => {
        return new CustomLoggerService('App');
      },
    },
  ],
  exports: [PaginationService, CustomLoggerService, 'Logger'],
})
export class CommonModule {}
