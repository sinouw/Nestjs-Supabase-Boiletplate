import { Injectable, Logger } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { ConfigService } from 'src/config/config.service';

/**
 * @description This service is used to create and manage Supabase clients.
 * Services that need to interact with Supabase should inject this service.
 */
@Injectable()
export class SupabaseService {
  private readonly logger = new Logger(SupabaseService.name);
  private supabase: SupabaseClient;
  private adminClient: SupabaseClient;

  constructor(private configService: ConfigService) {
    try {
      this.logger.log('Initializing Supabase clients');

      this.supabase = createClient(
        this.configService.supabaseUrl,
        this.configService.supabaseKey,
      );

      this.adminClient = createClient(
        this.configService.supabaseUrl,
        this.configService.supabaseServiceKey,
        {
          auth: {
            autoRefreshToken: false,
            persistSession: false,
          },
        },
      );

      this.logger.log('Supabase clients initialized successfully');
    } catch (error) {
      this.logger.error('Failed to initialize Supabase clients:', error);
      throw error;
    }
  }

  /**
   * @description Get the regular Supabase client.
   * @returns {SupabaseClient} The Supabase client.
   */
  getClient(): SupabaseClient {
    this.logger.debug('Getting regular Supabase client');
    return this.supabase;
  }

  /**
   * @description Get the admin Supabase client.
   * @returns {SupabaseClient} The admin Supabase client.
   */
  getAdminClient(): SupabaseClient {
    this.logger.debug('Getting admin Supabase client');
    return this.adminClient;
  }
}
