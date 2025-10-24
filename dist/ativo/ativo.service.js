"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AtivoService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const ativo_entity_1 = require("./entities/ativo.entity");
let AtivoService = class AtivoService {
    constructor(ativoRepository) {
        this.ativoRepository = ativoRepository;
    }
    create(createAtivoDto) {
        const ativo = this.ativoRepository.create(createAtivoDto);
        return this.ativoRepository.save(ativo);
    }
    findAll() {
        return this.ativoRepository.find();
    }
    update(id, updateAtivoDto) {
        return this.ativoRepository.save({ ...updateAtivoDto, id });
    }
    async remove(id) {
        await this.ativoRepository.delete(id);
    }
};
exports.AtivoService = AtivoService;
exports.AtivoService = AtivoService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(ativo_entity_1.Ativo)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], AtivoService);
//# sourceMappingURL=ativo.service.js.map