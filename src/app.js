// Archivo de configuración de express
import express from "express";
import dotenv from "dotenv";
dotenv.config()

import router from "./routes/countriesRoutes.js"

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json())

// Montar enrutador
app.use("/api", router)

export { app, port }