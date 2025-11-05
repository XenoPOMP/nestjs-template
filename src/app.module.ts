import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EnvironmentModule } from './features/environment/environment.module';
import { PrismaModule } from './features/prisma/prisma.module';

@Module({
  imports: [PrismaModule, ConfigModule.forRoot(), EnvironmentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
