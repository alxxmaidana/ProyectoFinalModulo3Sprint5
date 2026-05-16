import { conectarDB } from "../db/DBConfig.js";
import { cargarPaisesHispanohablantes, filtrarPaisesHispanohablantes, mapearPaisesHispanos} from "../services/countriesService.js";

async function seedPaises() {
    try {
        await conectarDB();
        const response = await fetch("https://restcountries.com/v3.1/region/americas");
        const paises = await response.json();
        // Filtrar los paises hispanohablantes
        const paisesHispanos =  filtrarPaisesHispanohablantes(paises);
        // Convertirlos paises al schema
        const paisesMapeados =  mapearPaisesHispanos(paisesHispanos);
        // Agregar paises convertidos a la colección de Mongo
        await cargarPaisesHispanohablantes(paisesMapeados);
        console.log("Paises cargados éxitosamente");
    } catch (error) {
        console.log("Error al cargar los paises", error);
    }
}

seedPaises();