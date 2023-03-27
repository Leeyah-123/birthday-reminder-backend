import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  DocumentBuilder,
  SwaggerDocumentOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import * as compression from 'compression';
import helmet from 'helmet';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // setting up middlewares
  app.enableCors({});
  app.setGlobalPrefix('/api');
  app.use(helmet());
  app.use(compression());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );

  // setting up swagger
  const config = new DocumentBuilder()
    .setTitle('Birthday Reminder')
    .setDescription('API description for Birthday Reminder app')
    .setVersion('1.0')
    .addTag('birthday_reminder')
    .build();

  const options: SwaggerDocumentOptions = {
    operationIdFactory: (_controllerKey: string, methodKey: string) =>
      methodKey,
  };

  const document = SwaggerModule.createDocument(app, config, options);
  SwaggerModule.setup('docs', app, document);

  const PORT = process.env.PORT || 5000;
  // for production
  const HOST = process.env.HOST || '0.0.0.0';

  await app.listen(PORT, HOST);
}

bootstrap();
