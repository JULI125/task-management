import express, { Request, Response } from "express";
import { NextFunction } from "express";
import { ObjectId } from "mongodb";
import { collections } from "../services/database.service";
import { decodeToken } from '../firebase/adminToken';
import { pool } from '../services/register.service';
import { upload } from '../config/multer.config';
import { uploadFile } from '../config/storage.config';
import { ContainerTypes, ExpressJoiError } from "express-joi-validation";
import { QueryResult } from 'pg';
import validator from '../utilities/validator';
import tareaSchema from '../schemas-joi/task.schemas';
import registerSchema from '../schemas-joi/register.schemas';
import sendEmail from '../utilities/register';
import templateIds from '../constants/templateid.const';
export const router = express.Router();
export const routerRegister = express.Router();

router.use(express.json());

router.use((err: any|ExpressJoiError, _req: Request, res: Response, next: NextFunction) => {
    if (err && err.type in ContainerTypes){
        const e: ExpressJoiError = err
        res.status(400).send(`You submitted a bad ${e.type} paramater`)
    }else{
        res.status(500).send('Internal server error')

    }
});

router.get("/task",  async (_req: Request, res: Response) => {
    try {
        const tarea = await collections.tareas.find({}).toArray();
        res.status(200).send(tarea);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.post("/task", validator.body(tareaSchema), async (_req: Request, res: Response) => {
    const newTarea = _req.body;
    const id = _req.params;
    const tarea = await collections.tareas.insertOne(newTarea);
    upload(_req, res, async (error) => {

    if(_req.file){
        let route = _req.file.filename;
        let destino = (`userImage${id.id}.jpg`);
        const imageQuery = `https://storage.cloud.google.com/taskManagement-bucket/user-image/${destino}?authuser=1`
        uploadFile(route, `user-image/${destino}`);
    }if(error){
        console.log(error);
        error.message = 'failed to load image';
        return res.send(error);
    }else if(_req.files){
        console.log(_req.files);
        return res.send('Image uploaded successfully')
    }
    try{ 
        return res.status(200).send(`task created successfully ${tarea}`);
     }catch(error){
      console.log(error); 
      return res.status(500).send(`failed create task ${error}`);
    }
    });
});

router.put("/task/:id", decodeToken, validator.body(tareaSchema), async (_req: Request, res: Response) => {
    const id = _req.params.id;
    try{
        const updatedTareas = _req.body;
        const query = { _id: new ObjectId(id) };
      
        const result = await collections.tareas.updateOne(query, { $set: updatedTareas });
        result
            ? res.status(200).send(`Successfully updated user with id ${id}`)
            : res.status(304).send(`User with id: ${id} not updated`);
    }catch(error){
        console.error(error.message);
        res.status(400).send(error.message);
    }
});

router.delete("/task/:id", decodeToken, async (req: Request, res: Response) => {
    const id = req.params.id;
    try{
        const query = { _id: new ObjectId(id) };
        const result = await collections.tareas.deleteOne(query);

        if(result && result.deletedCount) {
            res.status(202).send(`Successfully removed user with id ${id}`);
        }else if(!result) {
            res.status(400).send(`Failed to remove user no register with id ${id}`);
        }else if(!result.deletedCount) {
            res.status(404).send(`User with id ${id} does not exist`);
        }
    }catch(error){
        console.error(error.message);
        res.status(400).send(error.message);
    }
});

routerRegister.get('/registro',  async (req: Request, res: Response) => { 
    let cliente = await pool.connect();
    const result: QueryResult = await pool.query('SELECT * FROM register;');
    try {
      return res.status(200).json(result.rows);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    } finally {
      cliente.release(true)
  }
  }); 

routerRegister.post("/registro", validator.body(registerSchema), async (req: Request, res: Response) => {
  let cliente = await pool.connect();
    const {names, lastname, email, passwor } = req.body;
    const result = await pool.query('INSERT INTO register (names, lastname, email, passwor) VALUES ($1,$2,$3,$4);',
  ([names, lastname, email, passwor]));
  console.log(email, names); 
  try{ 
    await sendEmail(
      email,
      {
        subject: 'Validate email',
        names,
      },
      templateIds.SEND_CODE
    );
    return res.status(200).send('Registro creado con exito');
  }catch(error){
    console.log(error); 
    return res.status(500).send(error);
  }finally{
    cliente.release(true)
 }
});

routerRegister.put("/registro/:id", decodeToken, validator.body(registerSchema), async (req: Request, res: Response) =>{
    let cliente = await pool.connect();
    const id = req.params.id;
    try{
    const { names, lastname, email, passwor} = req.body;
    const result = await pool.query('UPDATE register SET names = $1, lastname = $2, email = $3, passwor = $4;',
    [
        names,
        lastname,
        email,
        passwor,
        id
    ]);
    res.status(200).json(result.rows);
    }catch(error){
    res.status(500).json(error);
    console.log(error); 
    }finally{
    cliente.release(true)
  }
});
  
routerRegister.delete("/registro/:id", async (req: Request, res: Response) =>{
    let cliente = await pool.connect();
    const {id} = req.params;
        await pool.query(`DELETE FROM register WHERE id = ${id};`)
    try { 
        res.status(200).json('User deleted successfully');
    } catch (error) {
        res.status(500).json({error: "Internal server error"});
        console.log(error); 
    }finally{
        cliente.release(true)
    }
});

export default {router, routerRegister};