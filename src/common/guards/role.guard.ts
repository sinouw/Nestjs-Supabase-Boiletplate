import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { APP_ROLES } from 'src/common/constants/app.constants';

export const Roles = (...roles: APP_ROLES[]) => {
  return (
    target: any,
    propertyKey?: string,
    descriptor?: PropertyDescriptor,
  ) => {
    Reflect.defineMetadata('roles', roles, descriptor?.value ?? target);
  };
};

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<APP_ROLES[]>(
      'roles',
      context.getHandler(),
    );

    // If no roles are specified, allow access
    if (!roles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    // Check if user exists and has a role
    if (!user?.user_metadata?.role) {
      throw new UnauthorizedException('User role not found');
    }

    // Check if user's role is included in the required roles
    if (!roles.includes(user.user_metadata.role)) {
      throw new UnauthorizedException('Insufficient permissions');
    }

    return true;
  }
}
