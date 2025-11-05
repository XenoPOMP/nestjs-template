import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { EnvironmentService } from './environment.service';

@Global()
@Module({
  providers: [EnvironmentService, ConfigService],
  exports: [EnvironmentService],
})
export class EnvironmentModule {}
