import { Global, Module } from '@nestjs/common';

import { PrismaService } from './prisma.service';

@Global() // Make this module global, because prisma is used everywhere
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
