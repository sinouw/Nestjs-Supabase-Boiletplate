import { APP_ROLES } from 'src/common/constants/app.constants';

export interface AdminSeedConfig {
  metadata: {
    role: APP_ROLES;
    is_active: boolean;
  };
}

export const superAdminSeed: AdminSeedConfig = {
  metadata: {
    role: APP_ROLES.SUPER_ADMIN,
    is_active: true,
  },
};
