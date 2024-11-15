import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getDefaultMessage(): string {
    return `
      <div style="text-align: center">
        <h1>🌟 Welcome to Supabase Backend Service! 🌟</h1>
      </div>
    `;
  }
}
