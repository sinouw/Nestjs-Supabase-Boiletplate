import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from 'src/config/config.service';
import { SupabaseService } from '../../../infrastructure/supabase/supabase.service';
import { CustomLoggerService } from '../../../common/services/logger.service';
import { AdminSeedConfig, superAdminSeed } from './admin.seed';

@Injectable()
export class AdminSeederService implements OnModuleInit {
  constructor(
    private readonly configService: ConfigService,
    private readonly supabaseService: SupabaseService,
    private readonly logger: CustomLoggerService,
  ) {}

  async onModuleInit() {
    try {
      await this.seedSuperAdmin();
    } catch (error) {
      this.logger.error('Failed to initialize database:', error);
      throw error;
    }
  }

  async seedSuperAdmin() {
    try {
      const email = this.configService.superAdminEmail;
      const superAdminExists = await this.checkAdminExists(
        email,
        superAdminSeed.metadata.role,
      );
      if (!superAdminExists) {
        const data = await this.createAdmin(superAdminSeed);
        this.logger.log('Super admin created successfully');
        return data;
      }
      this.logger.log(`Super admin already exists: ${email}`);
    } catch (error) {
      this.logger.error('Error occurred while seeding super admin:', error);
      throw error;
    }
  }

  async checkAdminExists(email: string, role: string): Promise<boolean> {
    const {
      data: { users },
      error: listError,
    } = await this.supabaseService.getAdminClient().auth.admin.listUsers();

    if (listError) {
      throw listError;
    }

    return users?.some(
      (user: { email: string; user_metadata: { role: string } }) =>
        user.email === email && user.user_metadata?.role === role,
    );
  }

  async createAdmin(config: AdminSeedConfig): Promise<any> {
    const { data, error } = await this.supabaseService
      .getAdminClient()
      .auth.admin.createUser({
        email: this.configService.superAdminEmail,
        password: this.configService.superAdminPassword,
        email_confirm: true,
        user_metadata: config.metadata,
      });

    if (error) {
      throw error;
    }

    return data;
  }
}
