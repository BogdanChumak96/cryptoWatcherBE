import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder } from '@nestjs/swagger';
import { SwaggerModule } from '@nestjs/swagger/dist';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get('port');
  app.useGlobalPipes(new ValidationPipe());
  const config = new DocumentBuilder()
    .setTitle('Crypto api')
    .setDescription('Api for watching crypto')
    .setVersion('1.0.0')
    .addTag('Api')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('API', app, document);
  await app.listen(port);
}

bootstrap();
