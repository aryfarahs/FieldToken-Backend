import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { HealthModule } from "./health/health.module";
import { AtivoModule } from "./ativo/ativo.module";
import { Ativo } from "./ativo/entities/ativo.entity";

@Module({
  imports: [
    // ✅ Carrega variáveis de ambiente conforme o ambiente atual
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === "production" ? ".env.prod" : ".env",
    }),

    // ⚙️ Configuração do TypeORM com MongoDB Atlas
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
          synchronize: process.env.NODE_ENV !== "production",
          entities: [Ativo],
          database: "fieldtoken",
        };
      },
    }),
    HealthModule,
    AtivoModule,
  ],
})
export class AppModule {}
