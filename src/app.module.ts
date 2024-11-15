import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonModule } from './common/common.module';
import { PrismaModule } from './infrastructure/prisma/prisma.module';
import { SupabaseModule } from './infrastructure/supabase/supabase.module';
import { UsersModule } from './modules/users/users.module';
import { AdminsModule } from './modules/admins/admins.module';
import { PlansModule } from './modules/plans/plans.module';
import { ProfessionsModule } from './modules/professions/professions.module';
import { ConfigModule } from './config/config.module';
import { AuthModule } from './modules/auth/auth.module';
import { CompaniesModule } from './modules/companies/companies.module';
import { InterestsModule } from './modules/interests/interests.module';
import { AddressesModule } from './modules/addresses/addresses.module';
import { HealthModule } from './health/health.module';

@Module({
  imports: [
    ConfigModule,
    CommonModule,
    PrismaModule,
    SupabaseModule,
    AuthModule,
    UsersModule,
    AdminsModule,
    PlansModule,
    ProfessionsModule,
    CompaniesModule,
    InterestsModule,
    AddressesModule,
    HealthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
