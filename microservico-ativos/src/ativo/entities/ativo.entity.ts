// src/entities/ativo.entity.ts

import { Entity, ObjectId, ObjectIdColumn, Column } from 'typeorm';

/**
 * @Entity decorator marca a classe como uma entidade do TypeORM.
 * O nome 'ativo' é o nome da collection no MongoDB.
 */
@Entity('ativo')
export class Ativo {
  /**
   * @ObjectIdColumn é um decorador especial para a chave primária (_id) do MongoDB.
   * O TypeORM irá mapear esta propriedade para o campo `_id` do documento.
   */
  @ObjectIdColumn({name: '_id'})
  id: ObjectId;

  /**
   * @Column é o decorador para uma coluna/campo padrão.
   * Usamos a opção `{ name: 'nom' }` para mapear a propriedade `nome` da nossa classe
   * para o campo `nom` na collection do MongoDB.
   */
  @Column()
  nome: string;

  /**
   * Campo para o tipo de ativo (ex: "Ação", "FII", "Cripto").
   */
  @Column()
  tipo: string;

  /**
   * Campo para o valor do ativo. O tipo 'number' em TypeScript
   * corresponde aos tipos numéricos do MongoDB (como Double ou Int32).
   */
  @Column()
  valor: number;
}