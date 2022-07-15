"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const tareaSchema = joi_1.default.object({
    image: joi_1.default.string().required(),
    nameOfTheHomework: joi_1.default.string().required(),
    priority: joi_1.default.string().required(),
    date: joi_1.default.date().required()
});
exports.default = tareaSchema;
//# sourceMappingURL=task.schemas.js.map