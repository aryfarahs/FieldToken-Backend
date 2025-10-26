import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import cookieParser from "cookie-parser";
import { ValidationPipe, Logger } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Middleware
  // app.use(cookieParser());

  // CORS
  const frontendUrl = process.env.FRONTEND_URL || "*";
  app.enableCors({
    origin: frontendUrl,
    credentials: true,
  });

  // Validação global de DTOs
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // remove propriedades não definidas no DTO
      forbidNonWhitelisted: true, // lança erro se houver propriedades extras
      transform: true, // transforma payloads para tipos definidos nos DTOs
    })
  );

  // Porta
  const port = process.env.PORT || 3000;
  await app.listen(port);

  // Log
  const logger = new Logger("Bootstrap");
  logger.log(`🚀 API is running on http://localhost:${port}`);
  logger.log(`🌐 CORS allowed for: ${frontendUrl}`);
}
bootstrap();
