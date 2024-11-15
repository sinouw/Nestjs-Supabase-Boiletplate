import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { SupabaseService } from '../../infrastructure/supabase/supabase.service';

@Injectable()
export class SupabaseGuard implements CanActivate {
  constructor(private readonly supabaseService: SupabaseService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedException('No authorization header');
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException('No token provided');
    }

    try {
      const {
        data: { user },
        error,
      } = await this.supabaseService.getClient().auth.getUser(token);

      if (error || !user) {
        throw new UnauthorizedException('Invalid token');
      }

      // Attach both user and token to the request object
      request.user = {
        ...user,
        token,
      };
      return true;
    } catch (error) {
      console.error(error);
      throw new UnauthorizedException('Invalid token');
    }
  }
}
