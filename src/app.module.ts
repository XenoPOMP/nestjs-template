import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from '@/routes/auth/auth.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EnvironmentModule } from './features/environment/environment.module';
import { PrismaModule } from './features/prisma/prisma.module';
import { UserModule } from './routes/user/user.module';

@Module({
  imports: [
    AuthModule,
    PrismaModule,
    ConfigModule.forRoot(),
    EnvironmentModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
