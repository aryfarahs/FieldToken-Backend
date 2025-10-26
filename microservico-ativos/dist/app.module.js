"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const health_module_1 = require("./health/health.module");
const ativo_module_1 = require("./ativo/ativo.module");
const ativo_entity_1 = require("./ativo/entities/ativo.entity");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: process.env.NODE_ENV === "production" ? ".env.prod" : ".env",
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (config) => {
                    const mongoUri = config.get("MONGO_URI");
                    if (!mongoUri) {
                        throw new Error("❌ Variável de ambiente MONGO_URI não definida");
                    }
                    console.log(`✅ Conectando ao MongoDB em: ${mongoUri}`);
                    return {
                        type: "mongodb",
                        url: mongoUri,
                        useUnifiedTopology: true,
                        synchronize: process.env.NODE_ENV !== "production",
                        entities: [ativo_entity_1.Ativo],
                        database: "fieldtoken",
                    };
                },
            }),
            health_module_1.HealthModule,
            ativo_module_1.AtivoModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map