export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  supabase: {
    url: process.env.SUPABASE_URL,
    key: process.env.SUPABASE_KEY,
  },
  admin: {
    superAdminEmail: process.env.SUPER_ADMIN_EMAIL || 'super.admin@example.com',
    superAdminPassword: process.env.SUPER_ADMIN_PASSWORD || 'superadmin123',
  },
  database: {
    url:
      process.env.DATABASE_URL ||
      'postgresql://postgres.uihbeodokuhfpgfdlpky:[YOUR-PASSWORD]@aws-0-ca-central-1.pooler.supabase.com:6543/postgres',
  },
});
