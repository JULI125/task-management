import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";
import tareas from '../models/tarea';

export const collections: { tareas?: mongoDB.Collection<tareas>} = {};

export async function connectToDatabase () {
    dotenv.config();
 
const client: mongoDB.MongoClient = new mongoDB.MongoClient(process.env.DB_CONN_STRING);        
    await client.connect();
        
        const db: mongoDB.Db = client.db(process.env.DB_NAME);
        const tareasCollection = db.collection<tareas>(process.env.USER_COLLECTION_NAME);
        collections.tareas = tareasCollection;
       
    console.log(`Successfully connected to database: ${db.databaseName} and collection: ${tareasCollection.collectionName}`);
}