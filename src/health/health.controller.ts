import { Controller, Get } from '@nestjs/common';
import mongoose from 'mongoose';

@Controller('health')
export class HealthController {
  @Get()
  async check() {
    const state = mongoose.connection.readyState; // 1=connected
    return {
      ok: true,
      mongo: state === 1 ? 'connected' : 'disconnected',
      ts: new Date().toISOString(),
    };
  }
}
