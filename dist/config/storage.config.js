"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadFile = void 0;
const dotenv = __importStar(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv.config();
const uploadFile = (ruta, destino) => __awaiter(void 0, void 0, void 0, function* () {
    const google_cloud_project = process.env.PROJECT_NAME; // Nombre del proyecto en Google Cloud
    const google_cloud_bucket = process.env.BUCKET_NAME; // Nombre del Bucket
    const file_name = path_1.default.join(__dirname, `../../public/${ruta}`); // Nombre del archivo a subir      
    const detination_file = destino; // Nombre del archivo a subir
    const { Storage } = require('@google-cloud/storage'); // Importar la libreria del storage
    const storage = new Storage({
        projectID: google_cloud_project,
        keyFilename: path_1.default.join(__dirname, "./key.json")
    });
    try {
        yield storage.bucket(google_cloud_bucket).upload(file_name, {
            destination: detination_file,
        });
        console.log(`${file_name} uploaded to ${google_cloud_bucket}`);
    }
    catch (error) {
        console.log(error);
    }
    ;
});
exports.uploadFile = uploadFile;
//# sourceMappingURL=storage.config.js.map