import { Injectable } from '@nestjs/common';
import { EnvironmentService } from './features/environment/environment.service';

@Injectable()
export class AppService {
  constructor(private readonly env: EnvironmentService) {}

  getHello() {
    const envSchema = this.env.schema();

    return {
      message: 'Hello World!',
      env: envSchema.NODE_ENV,
    };
  }
}
