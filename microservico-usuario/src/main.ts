import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // -------------------------------
  // CORS
  // -------------------------------
  app.enableCors({
    origin: '*', // pode trocar se quiser
    credentials: false,
  });

  // -------------------------------
  // Validation Pipes Globais
  // -------------------------------
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  // -------------------------------
  // SWAGGER
  // -------------------------------
  const config = new DocumentBuilder()
    .setTitle('Microserviço Usuário')
    .setDescription('API responsável pela gestão de usuários')
    .setVersion('1.0.0')
    .addTag('Usuarios')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  // -------------------------------
  // Porta para Azure Container Apps
  // -------------------------------
  const port = 4000;
  await app.listen(port);

  const logger = new Logger('Bootstrap');
  logger.log(`🚀 Microserviço rodando na porta ${port}`);
  logger.log('📘 Swagger disponível em /swagger');
}

bootstrap();
