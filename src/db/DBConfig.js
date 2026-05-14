import dotenv from "dotenv";
import mongoose from "mongoose";
import dns from "node:dns"

dns.setServers(["1.1.1.1"],["8.8.8.8"]);
dotenv.config();

export async function conectarDB() {
    try {
        await mongoose.connect(process.env.CONNECTION_STRING);
        console.log("Conexión éxitosa a la Base de datos");
    } catch (error) {
        console.log("Error al conectar a la Base de datos", error);
        throw error;
    }
}