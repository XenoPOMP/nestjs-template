import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import cookieParser from 'cookie-parser';

import { AppModule } from './app.module';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

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

  await app.listen(process.env.PORT ?? 4242);
}
// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap();
