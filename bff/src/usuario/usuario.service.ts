import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { Usuario } from './entities/usuario.entity';

@Injectable()
export class UsuarioService {
  private baseUrl = process.env.USUARIOS_URL;

  constructor(private readonly httpService: HttpService) {}

  async create(createUsuarioDto: Partial<Usuario>): Promise<Usuario> {
    const response = await firstValueFrom(
      this.httpService.post(`${this.baseUrl}/usuario`, createUsuarioDto),
    );
    return response.data as Usuario;
  }

  async findAll(): Promise<Usuario[]> {
    const response = await firstValueFrom(
      this.httpService.get(`${this.baseUrl}/usuario`),
    );
    return response.data as Usuario[];
  }

  async findOne(id: number): Promise<Usuario> {
    const response = await firstValueFrom(
      this.httpService.get(`${this.baseUrl}/usuario/${id}`),
    );
    return response.data as Usuario;
  }

  async update(
    id: number,
    updateUsuarioDto: Partial<Usuario>,
  ): Promise<Usuario> {
    const response = await firstValueFrom(
      this.httpService.put(`${this.baseUrl}/usuario/${id}`, updateUsuarioDto),
    );
    return response.data as Usuario;
  }

  async remove(id: number): Promise<void> {
    await firstValueFrom(
      this.httpService.delete(`${this.baseUrl}/usuario/${id}`),
    );
  }
}
