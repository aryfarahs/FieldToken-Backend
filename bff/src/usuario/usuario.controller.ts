import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  HttpCode,
  Headers,
} from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { Usuario } from './entities/usuario.entity';
import {
  ApiTags,
  ApiOperation,
  ApiBody,
  ApiParam,
  ApiResponse,
  ApiHeader,
} from '@nestjs/swagger';

@ApiTags('BFF - Usuário')
@Controller('bff/usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Post()
  @HttpCode(202)
  @ApiOperation({ summary: 'Enfileira criação de usuário (Event-Driven)' })
  @ApiHeader({
    name: 'x-correlation-id',
    required: false,
    description: 'ID de correlação para rastreamento',
  })
  @ApiBody({
    type: Usuario,
    examples: {
      exemplo: {
        value: {
          email: 'usuario@email.com',
          senha: '123456',
        },
      },
    },
  })
  @ApiResponse({
    status: 202,
    description: 'Requisição aceita e enviada ao Service Bus',
  })
  async create(
    @Body() body: Usuario,
    @Headers('x-correlation-id') corr?: string,
  ) {
    await this.usuarioService.enqueueCreate(body, corr);
    return { status: 'accepted' };
  }

  @Get()
  @ApiOperation({ summary: 'Lista todos os usuários' })
  @ApiResponse({
    status: 200,
    description: 'Lista retornada com sucesso',
    type: [Usuario],
  })
  findAll() {
    return this.usuarioService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Busca usuário por ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Usuário encontrado',
    type: Usuario,
  })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado' })
  findOne(@Param('id') id: number) {
    return this.usuarioService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualiza um usuário' })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({
    type: Usuario,
    description: 'Campos para atualizar',
  })
  @ApiResponse({ status: 200, description: 'Usuário atualizado' })
  update(@Param('id') id: number, @Body() updateUsuarioDto: Partial<Usuario>) {
    return this.usuarioService.update(id, updateUsuarioDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove um usuário' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Usuário removido' })
  remove(@Param('id') id: number) {
    return this.usuarioService.remove(id);
  }
}
