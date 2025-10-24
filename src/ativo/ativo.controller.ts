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
import { CreateAtivoDto } from "./dto/create-ativo.dto";
import { UpdateAtivoDto } from "./dto/update-ativo.dto";

@Controller("ativo")
export class AtivoController {
  constructor(private readonly ativoService: AtivoService) {}

  @Post()
  create(@Body() createAtivoDto: CreateAtivoDto) {
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
  update(@Param("id") id: string, @Body() updateAtivoDto: UpdateAtivoDto) {
    return this.ativoService.update(id, updateAtivoDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.ativoService.remove(id);
  }
}
