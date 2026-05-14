import express from "express";
import dotenv from "dotenv";
import { conectarDB } from "./db/DBConfig.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.send({message: "Corriendo server"})
})

async function iniciarServidor() {
    try {
        await conectarDB();
        app.listen(port, () => {
            console.log(`Servidor escuchando en puerto ${port}`);
        });
    } catch (error) {
        console.log("No se pudo levantar el servidor", error)
    }
}

iniciarServidor();