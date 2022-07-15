import { Request, Response } from 'express';
import { upload } from '../config/multer.config'

export const image = (req: Request, res: Response) => {
    upload(req, res, (error) => {
        if (error){
            console.log(error);
            error.message ='Error al cargar el archivo'
            return res.send(error)
        }
        if(req.file){
            console.log(req.file);
            return res.send('File uploaded successfully')
        }else if(req.files){
            console.log(req.files);
            return res.send('Files uploaded successfully')
        }
    });
};