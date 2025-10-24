import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Ativo } from "./entities/ativo.entity";
import { CreateAtivoDto } from "./dto/create-ativo.dto";
import { UpdateAtivoDto } from "./dto/update-ativo.dto";

@Injectable()
export class AtivoService {
  constructor(
    @InjectRepository(Ativo)
    private readonly ativoRepository: Repository<Ativo>
  ) {}

  create(createAtivoDto: CreateAtivoDto): Promise<Ativo> {
    const ativo = this.ativoRepository.create(createAtivoDto);
    return this.ativoRepository.save(ativo);
  }

  findAll(): Promise<Ativo[]> {
    return this.ativoRepository.find();
  }

  // async findOne(id: string): Promise<Ativo> {
  //   return await this.ativoRepository.findOneBy({ id });
  // }

  update(id: string, updateAtivoDto: UpdateAtivoDto): Promise<Ativo> {
    return this.ativoRepository.save({ ...updateAtivoDto, id });
  }

  async remove(id: string): Promise<void> {
    await this.ativoRepository.delete(id);
  }
}
