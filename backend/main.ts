import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { ValidationPipe, BadRequestException } from '@nestjs/common';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Swagger configuration (from feature/swagger-documentation)
  const config = new DocumentBuilder()
    .setTitle('Dewordle API')
    .setDescription('API documentation for Scav platform')
    .setVersion('1.0')
    .addBearerAuth() // Enable JWT authentication in Swagger
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  // Global validation pipe (from main)
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      exceptionFactory: (errors) => {
        const messages = errors.map((error) => {
          return {
            property: error.property,
            constraints: error.constraints,
          };
        });
        return new BadRequestException({
          message: 'Validation failed',
          errors: messages,
        });
      },
    }),
  );

  // Global filters (from main)
  // app.useGlobalFilters(
  //   new ValidationExceptionFilter(),
  //   new AuthExceptionFilter(),
  //   new SessionExceptionFilter(),
  //   new DatabaseExceptionFilter(),
  //   new BlockchainExceptionFilter(),
  //   new AllExceptionsFilter(),
  // );

  // Enable CORS (from main)
  app.enableCors({
    origin: '*', // All locations
    credentials: true, // Allow cookies
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allowed methods
    allowedHeaders: ['Content-Type', 'Authorization'],
  });
  app.setGlobalPrefix('api/v1');
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();