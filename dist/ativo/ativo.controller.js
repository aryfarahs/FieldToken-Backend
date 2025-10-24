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
exports.AtivoController = void 0;
const common_1 = require("@nestjs/common");
const ativo_service_1 = require("./ativo.service");
const create_ativo_dto_1 = require("./dto/create-ativo.dto");
const update_ativo_dto_1 = require("./dto/update-ativo.dto");
let AtivoController = class AtivoController {
    constructor(ativoService) {
        this.ativoService = ativoService;
    }
    create(createAtivoDto) {
        return this.ativoService.create(createAtivoDto);
    }
    findAll() {
        return this.ativoService.findAll();
    }
    update(id, updateAtivoDto) {
        return this.ativoService.update(id, updateAtivoDto);
    }
    remove(id) {
        return this.ativoService.remove(id);
    }
};
exports.AtivoController = AtivoController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_ativo_dto_1.CreateAtivoDto]),
    __metadata("design:returntype", void 0)
], AtivoController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AtivoController.prototype, "findAll", null);
__decorate([
    (0, common_1.Patch)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_ativo_dto_1.UpdateAtivoDto]),
    __metadata("design:returntype", void 0)
], AtivoController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AtivoController.prototype, "remove", null);
exports.AtivoController = AtivoController = __decorate([
    (0, common_1.Controller)("ativo"),
    __metadata("design:paramtypes", [ativo_service_1.AtivoService])
], AtivoController);
//# sourceMappingURL=ativo.controller.js.map