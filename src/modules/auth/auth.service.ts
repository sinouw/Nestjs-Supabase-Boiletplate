import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SupabaseService } from 'src/infrastructure/supabase/supabase.service';
import { AuthResponse, AuthTokenResponse } from '@supabase/supabase-js';
import { APP_ROLES } from 'src/common/constants/app.constants';
import { CustomLoggerService } from 'src/common/services/logger.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly supabaseService: SupabaseService,
    private readonly logger: CustomLoggerService,
  ) {
    this.logger = new CustomLoggerService(AuthService.name);
  }

  async signUp(email: string, password: string): Promise<AuthResponse['data']> {
    try {
      this.logger.logAuth('Sign Up Attempt', {
        email,
        action: 'SIGN_UP',
      });

      const startTime = Date.now();
      const { data, error } = await this.supabaseService
        .getClient()
        .auth.signUp({
          email,
          password,
          options: {
            data: {
              role: APP_ROLES.USER,
            },
          },
        });

      const duration = Date.now() - startTime;

      if (error) {
        this.logger.logError(error, {
          action: 'SIGN_UP',
          email,
          duration,
          errorType: 'AUTH_ERROR',
        });
        throw new UnauthorizedException(error.message);
      }

      this.logger.logAuth('Sign Up Success', {
        email,
        userId: data.user?.id,
        duration,
        action: 'SIGN_UP',
      });

      return data;
    } catch (error) {
      this.logger.logError(error, {
        action: 'SIGN_UP',
        email,
        errorType: 'UNEXPECTED_ERROR',
      });
      throw error;
    }
  }

  async signIn(
    email: string,
    password: string,
  ): Promise<AuthTokenResponse['data']> {
    try {
      this.logger.log(`Attempting to sign in user: ${email}`);
      const { data, error } = await this.supabaseService
        .getClient()
        .auth.signInWithPassword({
          email,
          password,
        });

      if (error) {
        this.logger.error(`Sign in failed for ${email}: ${error.message}`);
        throw new UnauthorizedException(error.message);
      }

      this.logger.log(`Successfully signed in user: ${email}`);
      return data;
    } catch (error) {
      this.logger.error(`Unexpected error during sign in for ${email}:`, error);
      throw error;
    }
  }

  async signOut(token: string) {
    console.log('user token:', token);
    const { error } = await this.supabaseService.getClient().auth.signOut();

    if (error) {
      throw new UnauthorizedException(error.message);
    }

    return { message: 'Signed out successfully' };
  }

  async getUser(token: string) {
    const {
      data: { user },
      error,
    } = await this.supabaseService.getClient().auth.getUser(token);

    if (error || !user) {
      throw new UnauthorizedException('Invalid token');
    }

    return user;
  }
}
