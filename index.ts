import express from 'express';
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
import { router } from "./src/routes/task.routermongo";
import { connectToDatabase } from "./src/services/database.service";
import { authRouter } from "./src/routes/auth.router";
import { routerRegister } from "./src/routes/task.routermongo";  

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Gestion de tareas",
      version: "1.0.0",
    },
    servers: [
      {
        url: "http://localhost:5000",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
        }
      }
    }
  },
  apis: ["./dist/docs/*.js"],
};
   
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

connectToDatabase()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server started at http://localhost:${process.env.PORT}`);
    });
    app.use("/auth", authRouter);
    app.use("/", router);
    app.use("/api", routerRegister);
})
  .catch((Error) => {
    console.error("Database connection failed", Error);
    process.exit();
});

export default app; 