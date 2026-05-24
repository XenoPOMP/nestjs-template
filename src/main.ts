import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import c from 'ansi-colors';
import cookieParser from 'cookie-parser';

import { AppModule } from './app.module';
//  Run side effect to set up dayjs with plugins
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

  // Default port is 4242
  const port: number = process.env.PORT ? +process.env.PORT : 4242;
  await app.listen(port);
  logger.log(
    `${c.italic('App is running at port')} ${c.bold.blue(port.toString())}`,
  );
}
// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap();
