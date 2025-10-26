import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from "@nestjs/common";
import { AtivoService } from "./ativo.service";
import { Ativo } from "./entities/ativo.entity";

@Controller("ativo")
export class AtivoController {
  constructor(private readonly ativoService: AtivoService) {}

  @Post()
  create(@Body() createAtivoDto: Partial<Ativo>) {
    return this.ativoService.create(createAtivoDto);
  }

  @Get()
  findAll() {
    return this.ativoService.findAll();
  }

  // @Get(":id")
  // findOne(@Param("id") id: string) {
  //   return this.ativoService.findOne(id);
  // }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateAtivoDto: Partial<Ativo>) {
    return this.ativoService.update(id, updateAtivoDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.ativoService.remove(id);
  }
}
