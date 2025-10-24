"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateAtivoDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_ativo_dto_1 = require("./create-ativo.dto");
class UpdateAtivoDto extends (0, mapped_types_1.PartialType)(create_ativo_dto_1.CreateAtivoDto) {
}
exports.UpdateAtivoDto = UpdateAtivoDto;
//# sourceMappingURL=update-ativo.dto.js.map