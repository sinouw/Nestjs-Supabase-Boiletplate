import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';

@Injectable()
export class ConfigService {
  constructor(private configService: NestConfigService) {}

  get port(): number {
    return this.configService.get<number>('port');
  }

  get supabaseUrl(): string {
    return this.configService.get<string>('supabase.url');
  }

  get supabaseKey(): string {
    return this.configService.get<string>('supabase.key');
  }

  get supabaseServiceKey(): string {
    return process.env.SUPABASE_SERVICE_KEY;
  }

  get superAdminEmail(): string {
    return (
      this.configService.get<string>('admin.superAdminEmail') ||
      'your_email@example.com'
    );
  }

  get superAdminPassword(): string {
    return (
      this.configService.get<string>('admin.superAdminPassword') ||
      'password123'
    );
  }

  get databaseUrl(): string {
    return this.configService.get<string>('database.url');
  }
}
