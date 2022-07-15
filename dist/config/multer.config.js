"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const uuidv4_1 = require("uuidv4");
const storage = multer_1.default.diskStorage({
    destination: path_1.default.join(__dirname, "../public"),
    filename: (req, file, cb) => {
        cb(null, (0, uuidv4_1.uuid)() + path_1.default.extname(file.originalname));
    }
});
exports.upload = (0, multer_1.default)({
    storage: storage,
    limits: {
        fileSize: 1000000
    },
}).single("image");
//# sourceMappingURL=multer.config.js.map