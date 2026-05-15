// Archivo de configuración de express
import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.get("/", (_req, res) => {
    res.send({ message: "Corriendo server" })
})

export { app, port }