import { ApiProperty } from '@nestjs/swagger';

export class Ativo {
  @ApiProperty({ example: '653f1a8e2b5c420001d4a17c' })
  id: string;

  @ApiProperty({ example: 'Ação PETR4' })
  nome: string;

  @ApiProperty({ example: 'Renda Variável' })
  tipo: string;

  @ApiProperty({ example: 27.5 })
  valor: number;
}
