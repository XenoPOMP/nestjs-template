import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import cookieParser from 'cookie-parser';

import { DayjsInterceptor } from '@/interceptors/dayjs/dayjs.interceptor';

import { AppModule } from './app.module';
import './features/dayjs';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('After start');

  // Middlewares
  app.use(cookieParser());
  app.enableCors({
    origin: [process.env.APP_HOST],
    credentials: true,
    exposedHeaders: 'set-cookie',
  });

  // Swagger
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Nest.js Template')
    .setDescription('Generated from nestjs-template')
    .setVersion('1.0.0')
    .build();

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const documentFactory = () =>
    SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup('openapi', app, documentFactory, {
    yamlDocumentUrl: 'openapi.yaml',
    jsonDocumentUrl: 'openapi.json',
    // TODO Opt-in disable public Swagger UI endpoint
    swaggerUiEnabled: true,
  });

  // Setup global interceptors
  app.useGlobalInterceptors(new DayjsInterceptor());

  // Default port is 4242
  const port: number = process.env.PORT ? +process.env.PORT : 4242;
  await app.listen(port);
  logger.log(`App is running at port ${port}`);
}
// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap();
