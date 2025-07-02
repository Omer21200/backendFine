import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import 'dotenv/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilita validaciones en todos los controladores
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // elimina propiedades no definidas en el DTO
      forbidNonWhitelisted: true, // lanza error si hay propiedades desconocidas
      transform: true, // convierte tipos (string → number, etc.)
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
