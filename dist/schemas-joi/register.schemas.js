"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const registerSchema = joi_1.default.object({
    names: joi_1.default.string(),
    lastname: joi_1.default.string(),
    email: joi_1.default.string().required(),
    passwor: joi_1.default.string().required()
});
exports.default = registerSchema;
//# sourceMappingURL=register.schemas.js.map