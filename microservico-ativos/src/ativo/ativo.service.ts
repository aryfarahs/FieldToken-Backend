import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, MongoRepository } from "typeorm";
import { ObjectId } from "mongodb";
import { Ativo } from "./entities/ativo.entity";

@Injectable()
export class AtivoService {
  private mongoRepo: MongoRepository<Ativo>;

  constructor(
    @InjectRepository(Ativo)
    private readonly ativoRepository: Repository<Ativo>
  ) {
    this.mongoRepo = this.ativoRepository.manager.getMongoRepository(Ativo);
  }

  create(createAtivoDto: Partial<Ativo>): Promise<Ativo> {
    const ativo = this.ativoRepository.create(createAtivoDto);
    return this.ativoRepository.save(ativo);
  }

  findAll(): Promise<Ativo[]> {
    return this.ativoRepository.find();
  }

  async findOne(id: string): Promise<Ativo> {
    const objectId = new ObjectId(id);
    const ativo = await this.mongoRepo.findOne({ where: { _id: objectId } });
    if (!ativo) throw new NotFoundException(`Ativo ${id} não encontrado`);
    return ativo;
  }

  async update(id: string, updateAtivoDto: Partial<Ativo>): Promise<Ativo> {
    const objectId = new ObjectId(id);
    const ativo = await this.mongoRepo.findOne({ where: { _id: objectId } });
    if (!ativo) throw new NotFoundException(`Ativo ${id} não encontrado`);

    Object.assign(ativo, updateAtivoDto);
    return this.mongoRepo.save(ativo);
  }

  async remove(id: string): Promise<void> {
    const objectId = new ObjectId(id);
    const result = await this.mongoRepo.deleteOne({ _id: objectId });
    if (result.deletedCount === 0)
      throw new NotFoundException(`Ativo ${id} não encontrado`);
  }
}
