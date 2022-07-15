import multer from "multer";
import path from "path";
import { uuid } from 'uuidv4';

const storage = multer.diskStorage({
    destination: path.join(__dirname, "../public"),
    filename: (req, file, cb) =>{
        cb(null, uuid() + path.extname(file.originalname));
    }
});

export const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1000000 
    },
}).single("image");
