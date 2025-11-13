import { ApiProperty } from '@nestjs/swagger';

export class Usuario {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'email@dominio.com' })
  email: string;

  @ApiProperty({ example: '123456' })
  senha: string;
}
