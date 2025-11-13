import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  HttpCode,
  Headers,
} from '@nestjs/common';
import { AtivoService } from './ativo.service';
import { Ativo } from './entities/ativo.entity';
import {
  ApiTags,
  ApiOperation,
  ApiBody,
  ApiParam,
  ApiResponse,
  ApiHeader,
} from '@nestjs/swagger';

@ApiTags('BFF - Ativo')
@Controller('bff/ativo')
export class AtivoController {
  constructor(private readonly ativoService: AtivoService) {}

  @Post()
  @HttpCode(202)
  @ApiOperation({ summary: 'Enfileira criação de ativo (Event-Driven)' })
  @ApiHeader({
    name: 'x-correlation-id',
    required: false,
    description: 'ID de correlação para rastreamento',
  })
  @ApiBody({
    type: Ativo,
    examples: {
      exemplo: {
        value: {
          nome: 'Ação PETR4',
          tipo: 'Renda Variável',
          valor: 27.5,
        },
      },
    },
  })
  @ApiResponse({
    status: 202,
    description: 'Requisição aceita e enviada ao Service Bus',
  })
  async create(
    @Body() body: Ativo,
    @Headers('x-correlation-id') corr?: string,
  ) {
    await this.ativoService.enqueueCreate(body, corr);
    return { status: 'accepted' };
  }

  @Get()
  @ApiOperation({ summary: 'Lista todos os ativos' })
  @ApiResponse({ status: 200, type: [Ativo] })
  findAll() {
    return this.ativoService.findAll();
  }

  @Get('usuario/:usuarioId')
  @ApiOperation({ summary: 'Lista ativos pertencentes a um usuário' })
  @ApiParam({ name: 'usuarioId', type: String })
  @ApiResponse({ status: 200, type: [Ativo] })
  findByUsuario(@Param('usuarioId') usuarioId: string) {
    return this.ativoService.findByUsuario(usuarioId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Busca ativo por ID' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, type: Ativo })
  @ApiResponse({ status: 404, description: 'Ativo não encontrado' })
  findOne(@Param('id') id: string) {
    return this.ativoService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualiza dados de um ativo' })
  @ApiParam({ name: 'id', type: String })
  @ApiBody({
    type: Ativo,
    description: 'Campos para atualização',
  })
  @ApiResponse({ status: 200, description: 'Ativo atualizado' })
  update(@Param('id') id: string, @Body() updateAtivoDto: Partial<Ativo>) {
    return this.ativoService.update(id, updateAtivoDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove um ativo' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, description: 'Ativo removido' })
  remove(@Param('id') id: string) {
    return this.ativoService.remove(id);
  }
}
