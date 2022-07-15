import * as dotenv from "dotenv";
import path from "path";
dotenv.config();

export const  uploadFile = async ( ruta: string, destino: string ) => {
    const google_cloud_project = process.env.PROJECT_NAME               // Nombre del proyecto en Google Cloud
    const google_cloud_bucket = process.env.BUCKET_NAME                 // Nombre del Bucket
    const file_name = path.join(__dirname, `../../public/${ruta}`)      // Nombre del archivo a subir      
    const detination_file = destino                                     // Nombre del archivo a subir
    const { Storage } = require('@google-cloud/storage');               // Importar la libreria del storage

    const storage = new Storage({
        projectID: google_cloud_project,
        keyFilename: path.join(__dirname, "./key.json")
    });
    
    try {
    await storage.bucket(google_cloud_bucket).upload(file_name, {
        destination: detination_file,
    });
    console.log(`${file_name} uploaded to ${google_cloud_bucket}`);
    } catch(error) {
        console.log(error);
    };
};