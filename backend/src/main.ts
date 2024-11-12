import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS with credentials
  app.enableCors({
    origin: 'http://localhost:3001', // The frontend URL (Next.js)
    methods: 'GET, POST, PUT, DELETE,PATCH', // Allow necessary HTTP methods
    allowedHeaders: 'Content-Type, Authorization', // Allow necessary headers
    credentials: true, // Allow credentials (cookies, authentication headers, etc.)
  });

  // Swagger setup
  const config = new DocumentBuilder()
    .setTitle('Book Management API')
    .setDescription('API to manage books in a library')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  );

  await app.listen(3000);
}

bootstrap();
