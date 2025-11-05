import { Global, Module } from '@nestjs/common';
import { EnvironmentService } from './environment.service';
import { ConfigService } from '@nestjs/config';

@Global()
@Module({
  providers: [EnvironmentService, ConfigService],
  exports: [EnvironmentService],
})
export class EnvironmentModule {}
