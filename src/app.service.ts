import { Injectable } from '@nestjs/common';
import { EnvironmentService } from './features/environment/environment.service';

@Injectable()
export class AppService {
  constructor(private readonly env: EnvironmentService) {}

  getHello() {
    const { NODE_ENV: env } = this.env.schema();

    return {
      message: 'Hello World!',
      env,
    };
  }
}
