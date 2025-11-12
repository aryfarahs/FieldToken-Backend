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

@Controller('bff/ativo')
export class AtivoController {
  constructor(private readonly ativoService: AtivoService) {}

  @Post()
  @HttpCode(202)
  async create(@Body() body: any, @Headers('x-correlation-id') corr?: string) {
    await this.ativoService.enqueueCreate(body, corr);
    return { status: 'accepted' };
  }

  @Get()
  findAll() {
    return this.ativoService.findAll();
  }

  @Get('usuario/:usuarioId')
  findByUsuario(@Param('usuarioId') usuarioId: string) {
    return this.ativoService.findByUsuario(usuarioId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ativoService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAtivoDto: Partial<Ativo>) {
    return this.ativoService.update(id, updateAtivoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ativoService.remove(id);
  }
}
