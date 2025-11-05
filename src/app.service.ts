import { Injectable } from '@nestjs/common';
import { EnvironmentService } from './features/environment/environment.service';

@Injectable()
export class AppService {
  constructor(private readonly env: EnvironmentService) {}

  getHello() {
    return {
      message: 'Hello World!',
      isProd: this.env.isProduction(),
    };
  }
}
