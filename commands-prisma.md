# Prisma Commands Reference

## Installation 

### Install Prisma CLI

```bash
npm install -g prisma
```

### Create Migration
```bash
npx prisma migrate dev --name init
```

### Generate Prisma Client

```bash
npx prisma generate
```

```bash
npx prisma migrate dev
```

### Seed Database

```bash
npx prisma db seed
```

### Deploy Migrations

```bash
npx prisma migrate deploy
```

### Reset Database

```bash
npx prisma migrate reset
```

### Open Prisma Studio

```bash
npx prisma studio
```


## Tips
- Always run `prisma generate` after schema changes
- Use `prisma migrate dev` in development
- Use `prisma migrate deploy` in production
- Back up your database before migrations
- Keep migrations in version control