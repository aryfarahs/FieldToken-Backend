import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { HealthModule } from "./health/health.module";
import { TokenModule } from "./token/token.module";
import { AtivoModule } from "./ativo/ativo.module";
import { Ativo } from "./ativo/entities/ativo.entity";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // TypeORM com MongoDB
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const mongoUri = config.get<string>("MONGO_URI");
        if (!mongoUri) {
          throw new Error("❌ Variável de ambiente MONGO_URI não definida");
        }
        console.log(`✅ Conectando ao MongoDB em: ${mongoUri}`);
        return {
          type: "mongodb",
          url: mongoUri,
          useUnifiedTopology: true,
          synchronize: true, // apenas dev
          entities: [Ativo],
          database: "fieldtoken", // opcional, pode ser extraído da URI
        };
      },
    }),

    // Health check básico
    HealthModule,

    TokenModule,

    AtivoModule,
  ],
})
export class AppModule {}
