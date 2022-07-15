"use strict";
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
exports.routerRegister = exports.router = void 0;
const express_1 = __importDefault(require("express"));
const mongodb_1 = require("mongodb");
const database_service_1 = require("../services/database.service");
const adminToken_1 = require("../firebase/adminToken");
const register_service_1 = require("../services/register.service");
const multer_config_1 = require("../config/multer.config");
const storage_config_1 = require("../config/storage.config");
const express_joi_validation_1 = require("express-joi-validation");
const validator_1 = __importDefault(require("../utilities/validator"));
const task_schemas_1 = __importDefault(require("../schemas-joi/task.schemas"));
const register_schemas_1 = __importDefault(require("../schemas-joi/register.schemas"));
const register_1 = __importDefault(require("../utilities/register"));
const templateid_const_1 = __importDefault(require("../constants/templateid.const"));
exports.router = express_1.default.Router();
exports.routerRegister = express_1.default.Router();
exports.router.use(express_1.default.json());
exports.router.use((err, _req, res, next) => {
    if (err && err.type in express_joi_validation_1.ContainerTypes) {
        const e = err;
        res.status(400).send(`You submitted a bad ${e.type} paramater`);
    }
    else {
        res.status(500).send('Internal server error');
    }
});
exports.router.get("/task", adminToken_1.decodeToken, (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tarea = yield database_service_1.collections.tareas.find({}).toArray();
        res.status(200).send(tarea);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}));
exports.router.post("/task", validator_1.default.body(task_schemas_1.default), (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newTarea = _req.body;
    const id = _req.params;
    const tarea = yield database_service_1.collections.tareas.insertOne(newTarea);
    (0, multer_config_1.upload)(_req, res, (error) => __awaiter(void 0, void 0, void 0, function* () {
        if (_req.file) {
            let route = _req.file.filename;
            let destino = (`userImage${id.id}.jpg`);
            const imageQuery = `https://storage.cloud.google.com/taskManagement-bucket/user-image/${destino}?authuser=1`;
            (0, storage_config_1.uploadFile)(route, `user-image/${destino}`);
        }
        if (error) {
            console.log(error);
            error.message = 'failed to load image';
            return res.send(error);
        }
        else if (_req.files) {
            console.log(_req.files);
            return res.send('Image uploaded successfully');
        }
        try {
            return res.status(200).send(`task created successfully ${tarea}`);
        }
        catch (error) {
            console.log(error);
            return res.status(500).send(`failed create task ${error}`);
        }
    }));
}));
exports.router.put("/task/:id", adminToken_1.decodeToken, validator_1.default.body(task_schemas_1.default), (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = _req.params.id;
    try {
        const updatedTareas = _req.body;
        const query = { _id: new mongodb_1.ObjectId(id) };
        const result = yield database_service_1.collections.tareas.updateOne(query, { $set: updatedTareas });
        result
            ? res.status(200).send(`Successfully updated user with id ${id}`)
            : res.status(304).send(`User with id: ${id} not updated`);
    }
    catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
}));
exports.router.delete("/task/:id", adminToken_1.decodeToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const query = { _id: new mongodb_1.ObjectId(id) };
        const result = yield database_service_1.collections.tareas.deleteOne(query);
        if (result && result.deletedCount) {
            res.status(202).send(`Successfully removed user with id ${id}`);
        }
        else if (!result) {
            res.status(400).send(`Failed to remove user no register with id ${id}`);
        }
        else if (!result.deletedCount) {
            res.status(404).send(`User with id ${id} does not exist`);
        }
    }
    catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
}));
exports.router.get('/registro', adminToken_1.decodeToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let cliente = yield register_service_1.pool.connect();
    try {
        const result = yield register_service_1.pool.query('SELECT * FROM register;');
        res.status(200).json(result.rows);
    }
    catch (error) {
        res.status(500).json(error);
        console.log(error);
    }
    finally {
        cliente.release(true);
    }
}));
exports.routerRegister.post("/registro", validator_1.default.body(register_schemas_1.default), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let cliente = yield register_service_1.pool.connect();
    const { names, lastname, email, passwor } = req.body;
    const result = yield register_service_1.pool.query('INSERT INTO register (names, lastname, email, passwor) VALUES ($1,$2,$3,$4);', ([names, lastname, email, passwor]));
    console.log(email, names);
    try {
        yield (0, register_1.default)(email, {
            subject: 'Validate email',
            names,
        }, templateid_const_1.default.SEND_CODE);
        return res.status(200).send(`Registro creado con exito ${register_1.default}`);
    }
    catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
    finally {
        cliente.release(true);
    }
}));
exports.routerRegister.put("/registro/:id", adminToken_1.decodeToken, validator_1.default.body(register_schemas_1.default), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let cliente = yield register_service_1.pool.connect();
    try {
        const id = req.params.id;
        const { names, lastname, email, passwor } = req.body;
        const result = yield register_service_1.pool.query('UPDATE register SET names = $1, lastname = $2, email = $3, passwor = $4;', [
            names,
            lastname,
            email,
            passwor,
            id
        ]);
        res.status(200).json(result.rows);
    }
    catch (error) {
        res.status(500).json(error);
        console.log(error);
    }
    finally {
        cliente.release(true);
    }
}));
exports.routerRegister.delete("/registro/:id", adminToken_1.decodeToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let cliente = yield register_service_1.pool.connect();
    try {
        const { id } = req.params;
        yield register_service_1.pool.query(`DELETE FROM register WHERE id = ${id};`);
        res.status(200).json('User deleted successfully');
    }
    catch (error) {
        res.status(500).json({ error: "Internal server error" });
        console.log(error);
    }
    finally {
        cliente.release(true);
    }
}));
exports.default = { router: exports.router, routerRegister: exports.routerRegister };
//# sourceMappingURL=task.routermongo.js.map