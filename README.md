<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# Supabase Backend Service

## Table of Contents
- [Supabase Backend Service](#supabase-backend-service)
  - [Table of Contents](#table-of-contents)
  - [1. Description](#1-description)
  - [2. Prerequisites](#2-prerequisites)
  - [3. Setup Instructions](#3-setup-instructions)
  - [4. Development](#4-development)
  - [5. Code Quality](#5-code-quality)
    - [5.1 ESLint](#51-eslint)
    - [5.2 Prettier](#52-prettier)
    - [5.3 Pre-commit Hooks](#53-pre-commit-hooks)
    - [5.2 Hot Reload Development](#52-hot-reload-development)
      - [Configuration](#configuration)
      - [Features](#features)
      - [Usage](#usage)
      - [Performance Optimization](#performance-optimization)
      - [Best Practices](#best-practices)
  - [6. Testing](#6-testing)
  - [7. Deployment](#7-deployment)
  - [8. License](#8-license)

## 1. Description
Supabase Backend Service is a backend service for the Supabase platform. It provides robust API endpoints, real-time communications, and secure data handling for seamless user interactions and content management.

## 2. Prerequisites
Before setting up the project, ensure you have the following installed:

1. Install pnpm globally:
    ```bash
    # Using npm
    npm install -g pnpm

    # Using Homebrew (macOS)
    brew install pnpm

    # Using Scoop (Windows)
    scoop install pnpm
    ```

2. Other required tools:
- Node.js (v18 or higher) - For running the JavaScript runtime environment
- PostgreSQL (v14 or higher) - Primary database for data persistence
- Supabase account - For authentication and real-time features
- Docker (optional) - For containerized development and deployment

## 3. Setup Instructions
1. Install NestJS CLI globally:
    ```bash
    pnpm add -g @nestjs/cli
    ```

2. Clone and install dependencies:
    ```bash
    pnpm install
    ```

3. Configure Git hooks for consistent code quality:
    ```bash
    pnpm husky install
    ```

4. Set up your environment variables:
    ```bash
    cp .env.example .env
    ```
    Configure the following essential variables in your `.env`:
    - `DATABASE_URL`: Your PostgreSQL connection string
    - `SUPABASE_URL`: Your Supabase project URL
    - `SUPABASE_KEY`: Your Supabase API key
    - `JWT_SECRET`: Your JWT signing secret

5. Initialize and seed your database:
    ```bash
    npx prisma migrate dev    # Apply database migrations
    npx prisma generate      # Generate Prisma Client
    npx prisma db seed      # Seed initial data
    ```

## 4. Development
Choose the appropriate mode for your development needs:
```bash
# Standard development with basic features
pnpm run start

# Development with hot-reload enabled
pnpm run start:dev

# Development with linting and type checking
pnpm run dev

# Production-ready build with optimizations
pnpm run start:prod
```

## 5. Code Quality
We maintain high code quality standards through automated tools and practices:

### 5.1 ESLint
Our ESLint configuration ensures consistent code style with:
- Strict TypeScript rules for type safety
- Integration with Prettier for formatting
- Custom rules for clean code practices
- Import sorting and organization

Run the linter:
```bash
pnpm run lint        # Check for issues
pnpm run lint:fix    # Automatically fix issues
```

### 5.2 Prettier
Consistent code formatting is enforced with the following rules:
- Single quotes for strings
- Trailing commas in multiline statements
- 2-space indentation
- 80-character line length limit
- Semicolons required
- No trailing spaces

### 5.3 Pre-commit Hooks
Our Git hooks automatically ensure code quality:
- Lint staged files
- Format code with Prettier
- Run relevant tests
- Validate commit messages
- Block commits that don't meet standards

### 5.2 Hot Reload Development
Our development environment is configured with advanced hot reload capabilities to enhance developer productivity:

#### Configuration
The hot reload system is configured in `nest-cli.json`:
```json
{
  "watchOptions": {
    "watchExclusions": ["node_modules", "dist"],
    "watchAssets": true
  }
}
```

#### Features
- **Fast Refresh**: Automatically recompiles and restarts on code changes
- **Memory Efficient**: Uses incremental compilation
- **Selective Reload**: Only reloads affected modules
- **Asset Watching**: Monitors static files and templates
- **Debug Support**: Maintains debugging sessions during reloads

#### Usage
```bash
# Start with basic hot reload
pnpm run start:dev

# Start with debug mode enabled
pnpm run start:debug

# Start with verbose logging
pnpm run start:dev --verbose
```

#### Performance Optimization
- Excludes `node_modules` and `dist` directories
- Implements debouncing for rapid changes
- Supports concurrent compilation
- Maintains TypeScript type checking

#### Best Practices
1. Use `.gitignore` patterns in `watchExclusions`
2. Avoid watching large directories
3. Configure appropriate debounce intervals
4. Utilize memory limits for large projects

## 6. Testing
Comprehensive testing suite for reliable code:
```bash
# Run unit tests with Jest
pnpm run test

# Run end-to-end tests with Cypress
pnpm run test:e2e

# Generate test coverage report
pnpm run test:cov
```

## 7. Deployment
Deploy your application following these steps:

1. Prepare for production:
   - Review the [NestJS deployment guide](https://docs.nestjs.com/deployment)
   - Ensure all environment variables are configured
   - Build the production bundle

2. Deploy using Mau (NestJS Official Platform):
    ```bash
    pnpm install -g mau
    mau deploy
    ```

3. Monitor your deployment:
   - Check application logs
   - Monitor performance metrics
   - Set up alerts for critical issues

## 8. License
This project is protected under the [MIT License](https://github.com/nestjs/nest/blob/master/LICENSE). See the LICENSE file for details.