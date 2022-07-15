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
const express_joi_validation_1 = require("express-joi-validation");
const validator_1 = __importDefault(require("../utilities/validator"));
const tarea_schemas_1 = __importDefault(require("../schemas-joi/tarea.schemas"));
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
exports.router.get("/mongo", adminToken_1.decodeToken, (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const tarea = yield ((_a = database_service_1.collections.tareas) === null || _a === void 0 ? void 0 : _a.find({}).toArray());
        res.status(200).send(tarea);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}));
exports.router.post("/task", validator_1.default.body(tarea_schemas_1.default), (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const newTarea = _req.body;
    const tarea = yield ((_b = database_service_1.collections.tareas) === null || _b === void 0 ? void 0 : _b.insertOne(newTarea));
    try {
        return res.status(200).send(`task created successfully ${tarea}`);
    }
    catch (error) {
        console.log(error);
        return res.status(500).send(`failed create task ${error}`);
    }
}));
exports.routerRegister.post("/registro", adminToken_1.decodeToken, validator_1.default.body(register_schemas_1.default), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let cliente = yield register_service_1.pool.connect();
    const { names, lastName, email, passwor } = req.body;
    const result = yield register_service_1.pool.query('INSERT INTO registro (names, lastName, email, passwor) VALUES ($1,$2,$3,$4);', ([names, lastName, email, passwor]));
    console.log(email, names);
    try {
        yield (0, register_1.default)(email, {
            subject: 'Validate email',
            names,
        }, templateid_const_1.default.SEND_CODE);
        return res.status(200).send(`Registro creado con exito`);
    }
    catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
    finally {
        cliente.release(true);
    }
}));
exports.router.put("/mongo/:id", adminToken_1.decodeToken, validator_1.default.body(tarea_schemas_1.default), (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    const id = _req.params.id;
    try {
        const updatedTareas = _req.body;
        const query = { _id: new mongodb_1.ObjectId(id) };
        const result = yield ((_c = database_service_1.collections.tareas) === null || _c === void 0 ? void 0 : _c.updateOne(query, { $set: updatedTareas }));
        result
            ? res.status(200).send(`Successfully updated user with id ${id}`)
            : res.status(304).send(`User with id: ${id} not updated`);
    }
    catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
}));
exports.router.delete("/mongo/:id", adminToken_1.decodeToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _d;
    const id = req.params.id;
    try {
        const query = { _id: new mongodb_1.ObjectId(id) };
        const result = yield ((_d = database_service_1.collections.tareas) === null || _d === void 0 ? void 0 : _d.deleteOne(query));
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
exports.default = { router: exports.router, routerRegister: exports.routerRegister };
//# sourceMappingURL=tarea.routermongo.js.map