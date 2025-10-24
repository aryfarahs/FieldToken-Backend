import { Module } from "@nestjs/common";
import { AtivoService } from "./ativo.service";
import { AtivoController } from "./ativo.controller";
import { Ativo } from "./entities/ativo.entity";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [TypeOrmModule.forFeature([Ativo])],
  controllers: [AtivoController],
  providers: [AtivoService],
})
export class AtivoModule {}
