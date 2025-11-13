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

@Controller('bff/usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Post()
  @HttpCode(202)
  async create(@Body() body: any, @Headers('x-correlation-id') corr?: string) {
    await this.usuarioService.enqueueCreate(body, corr);
    return { status: 'accepted' };
  }

  @Get()
  findAll() {
    return this.usuarioService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.usuarioService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateUsuarioDto: Partial<Usuario>) {
    return this.usuarioService.update(id, updateUsuarioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.usuarioService.remove(id);
  }
}
