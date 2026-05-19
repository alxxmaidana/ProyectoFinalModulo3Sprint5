import { conectarDB } from "./config/DBConfig.js";
import {app, port} from "./app.js";

async function iniciarServidor() {
    try {
        await conectarDB();
        app.listen(port, () => {
            console.log(`Servidor corriendo en http://localhost:${port}`);
        });
    } catch (error) {
        console.log("No se pudo levantar el servidor", error)
    }
}

iniciarServidor();