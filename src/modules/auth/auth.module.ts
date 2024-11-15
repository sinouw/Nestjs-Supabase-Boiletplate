import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { SupabaseModule } from '../../infrastructure/supabase/supabase.module';
import { CommonModule } from '../../common/common.module';

@Module({
  imports: [SupabaseModule, CommonModule],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
