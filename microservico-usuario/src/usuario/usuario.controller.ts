import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { UsuariosService } from './usuario.service';
import { Usuario } from './entities/usuario.entity';
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('Usuarios')
@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuariosService: UsuariosService) {}

  // -------------------------------
  // GET ALL
  // -------------------------------
  @Get()
  @ApiOperation({ summary: 'Lista todos os usuários' })
  @ApiResponse({
    status: 200,
    description: 'Lista de usuários retornada com sucesso',
    type: [Usuario],
  })
  findAll(): Promise<Usuario[]> {
    return this.usuariosService.findAll();
  }

  // -------------------------------
  // GET ONE
  // -------------------------------
  @Get(':id')
  @ApiOperation({ summary: 'Obtém um usuário pelo ID' })
  @ApiParam({ name: 'id', type: Number, example: 1 })
  @ApiResponse({
    status: 200,
    description: 'Usuário encontrado',
    type: Usuario,
  })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado' })
  findOne(@Param('id') id: number): Promise<Usuario | null> {
    return this.usuariosService.findOne(id);
  }

  // -------------------------------
  // CREATE
  // -------------------------------
  @Post()
  @ApiOperation({ summary: 'Cria um novo usuário' })
  @ApiBody({
    description: 'Objeto contendo email e senha',
    schema: {
      type: 'object',
      properties: {
        email: { type: 'string', example: 'user@email.com' },
        senha: { type: 'string', example: '123456' },
      },
      required: ['email', 'senha'],
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Usuário criado com sucesso',
    type: Usuario,
  })
  create(@Body() usuario: Partial<Usuario>): Promise<Usuario> {
    return this.usuariosService.create(usuario);
  }

  // -------------------------------
  // UPDATE
  // -------------------------------
  @Put(':id')
  @ApiOperation({ summary: 'Atualiza um usuário existente' })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({
    description: 'Objeto com campos atualizáveis do usuário',
    schema: {
      type: 'object',
      properties: {
        email: { type: 'string' },
        senha: { type: 'string' },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Usuário atualizado com sucesso',
    type: Usuario,
  })
  update(
    @Param('id') id: number,
    @Body() usuario: Partial<Usuario>,
  ): Promise<Usuario | null> {
    return this.usuariosService.update(id, usuario);
  }

  // -------------------------------
  // DELETE
  // -------------------------------
  @Delete(':id')
  @ApiOperation({ summary: 'Remove um usuário pelo ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Usuário removido com sucesso' })
  remove(@Param('id') id: number): Promise<void> {
    return this.usuariosService.remove(id);
  }
}
