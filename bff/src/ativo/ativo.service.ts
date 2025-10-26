import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { Ativo } from './entities/ativo.entity';

@Injectable()
export class AtivoService {
  private baseUrl = process.env.ATIVOS_URL;

  constructor(private readonly httpService: HttpService) {}

  async create(createAtivoDto: Partial<Ativo>): Promise<Ativo> {
    const response = await firstValueFrom(
      this.httpService.post(`${this.baseUrl}/ativo`, createAtivoDto),
    );
    return response.data as Ativo;
  }

  async findAll(): Promise<Ativo[]> {
    const response = await firstValueFrom(
      this.httpService.get(`${this.baseUrl}/ativo`),
    );
    return response.data as Ativo[];
  }

  async findByUsuario(usuarioId: string): Promise<Ativo[]> {
    const response = await firstValueFrom(
      this.httpService.get(`${this.baseUrl}/ativo?usuarioId=${usuarioId}`),
    );
    return response.data as Ativo[];
  }

  async findOne(id: string): Promise<Ativo> {
    const response = await firstValueFrom(
      this.httpService.get(`${this.baseUrl}/ativo/${id}`),
    );
    return response.data as Ativo;
  }

  async update(id: string, updateAtivoDto: Partial<Ativo>): Promise<Ativo> {
    const response = await firstValueFrom(
      this.httpService.patch(`${this.baseUrl}/ativo/${id}`, updateAtivoDto),
    );
    return response.data as Ativo;
  }

  async remove(id: string): Promise<void> {
    await firstValueFrom(
      this.httpService.delete(`${this.baseUrl}/ativo/${id}`),
    );
  }
}
