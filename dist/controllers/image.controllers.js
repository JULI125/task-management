"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.image = void 0;
const multer_config_1 = require("../config/multer.config");
const image = (req, res) => {
    (0, multer_config_1.upload)(req, res, (error) => {
        if (error) {
            console.log(error);
            error.message = 'Error al cargar el archivo';
            return res.send(error);
        }
        if (req.file) {
            console.log(req.file);
            return res.send('File uploaded successfully');
        }
        else if (req.files) {
            console.log(req.files);
            return res.send('Files uploaded successfully');
        }
    });
};
exports.image = image;
//# sourceMappingURL=image.controllers.js.map