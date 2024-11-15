import { Module, Global } from '@nestjs/common';
import { SupabaseService } from './supabase.service';
import { ConfigService } from '../../config/config.service';

@Global()
@Module({
  providers: [SupabaseService, ConfigService],
  exports: [SupabaseService],
})
export class SupabaseModule {}
