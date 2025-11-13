import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe, Logger } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // CORS
  const frontendUrl = process.env.FRONTEND_URL || "*";
  app.enableCors({
    origin: frontendUrl,
    credentials: true,
  });

  // Pipes globais
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    })
  );

  // -------------------------
  // 🚀 Swagger Configuration
  // -------------------------
  const config = new DocumentBuilder()
    .setTitle("FieldToken BFF")
    .setDescription(
      "Swagger do Backend For Frontend (BFF) responsável por orquestrar usuários e ativos."
    )
    .setVersion("1.0.0")
    .addTag("Usuario")
    .addTag("Ativo")
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("swagger", app, document);

  // Porta (Azure Container Apps usa process.env.PORT)
  const port = 3000;
  await app.listen(port, "0.0.0.0");

  const logger = new Logger("Bootstrap");
  logger.log(`🚀 API running on port ${port}`);
  logger.log(`📘 Swagger: /swagger`);
  logger.log(`🌐 CORS allowed for: ${frontendUrl}`);
}
bootstrap();
