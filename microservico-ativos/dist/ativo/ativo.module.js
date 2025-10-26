"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AtivoModule = void 0;
const common_1 = require("@nestjs/common");
const ativo_service_1 = require("./ativo.service");
const ativo_controller_1 = require("./ativo.controller");
const ativo_entity_1 = require("./entities/ativo.entity");
const typeorm_1 = require("@nestjs/typeorm");
let AtivoModule = class AtivoModule {
};
exports.AtivoModule = AtivoModule;
exports.AtivoModule = AtivoModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([ativo_entity_1.Ativo])],
        controllers: [ativo_controller_1.AtivoController],
        providers: [ativo_service_1.AtivoService],
    })
], AtivoModule);
//# sourceMappingURL=ativo.module.js.map