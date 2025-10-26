import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './usuario/entities/usuario.entity';
import { UsuarioModule } from './usuario/usuario.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // ⚙️ Configuração do banco SQL Server da Azure
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'mssql',
        host: process.env.DB_HOST,
        port: 1433,
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        //synchronize: true, // ❗apenas para dev; desligar em produção
        options: {
          encrypt: true,
          trustServerCertificate: false,
        },
        entities: [Usuario],
      }),
    }),

    UsuarioModule,
  ],
})
export class AppModule {}
