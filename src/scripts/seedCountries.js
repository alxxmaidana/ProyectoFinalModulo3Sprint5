import { conectarDB } from "../config/DBConfig.js";
import { seedPaisesController } from "../controllers/countriesControllers.js";

// Script para hacer el seed de los países hispanohablantes de América y URLs de banderas, zonas horarias y subregiones para el formulario.
// Se conecta a la DB, hace el seed y cierra la conexión.
async function seedPaises() {
    try {
        await conectarDB();
        await seedPaisesController();
        console.log("Datos de paises cargados éxitosamente");
    } catch (error) {
        console.log("Error al cargar los datos de los paises", error);
    } finally {
        process.exit();
    }
}

seedPaises();