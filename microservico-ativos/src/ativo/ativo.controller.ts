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
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
} from "@nestjs/swagger";

@ApiTags("Ativos")
@Controller("ativo")
export class AtivoController {
  constructor(private readonly ativoService: AtivoService) {}

  // -----------------------------
  // CREATE
  // -----------------------------
  @Post()
  @ApiOperation({ summary: "Cria um novo ativo" })
  @ApiBody({
    description: "Dados para criar um ativo",
    schema: {
      type: "object",
      properties: {
        nome: { type: "string" },
        tipo: { type: "string" },
        valor: { type: "number" },
      },
      required: ["nome", "tipo", "valor"],
    },
  })
  @ApiResponse({
    status: 201,
    description: "Ativo criado com sucesso",
    type: Ativo,
  })
  create(@Body() createAtivoDto: Partial<Ativo>) {
    return this.ativoService.create(createAtivoDto);
  }

  // -----------------------------
  // FIND ALL
  // -----------------------------
  @Get()
  @ApiOperation({ summary: "Lista todos os ativos" })
  @ApiResponse({
    status: 200,
    description: "Lista retornada com sucesso",
    type: [Ativo],
  })
  findAll() {
    return this.ativoService.findAll();
  }

  // -----------------------------
  // UPDATE
  // -----------------------------
  @Patch(":id")
  @ApiOperation({ summary: "Atualiza um ativo" })
  @ApiParam({ name: "id", type: "string" })
  @ApiBody({
    description: "Campos para atualizar um ativo",
    schema: {
      type: "object",
      properties: {
        nome: { type: "string" },
        tipo: { type: "string" },
        valor: { type: "number" },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: "Ativo atualizado com sucesso",
    type: Ativo,
  })
  update(@Param("id") id: string, @Body() updateAtivoDto: Partial<Ativo>) {
    return this.ativoService.update(id, updateAtivoDto);
  }

  // -----------------------------
  // DELETE
  // -----------------------------
  @Delete(":id")
  @ApiOperation({ summary: "Remove um ativo" })
  @ApiParam({ name: "id", type: "string" })
  @ApiResponse({
    status: 200,
    description: "Ativo removido com sucesso",
  })
  remove(@Param("id") id: string) {
    return this.ativoService.remove(id);
  }
}
