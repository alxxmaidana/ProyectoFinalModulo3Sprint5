import { conectarDB } from "../db/DBConfig.js";
import { cargarPaisesHispanos, filtrarPaisesHispanohablantes, mapearPaisesHispanos} from "../services/countriesService.js";
import { MongoClient } from 'mongodb';
async function seedPaises() {
    try {
        await conectarDB();
        const response = await fetch("https://restcountries.com/v3.1/region/americas");
        const paises = await response.json();
        // Filtrar los paises hispanohablantes
        const paisesHispanos =  filtrarPaisesHispanohablantes(paises);
        // Convertirlos paises al schema
        const paisesMapeados =  mapearPaisesHispanos(paisesHispanos)
        // Agregar paises convertidos a la colección de Mongo
        await cargarPaisesHispanos(paisesMapeados);
        console.log("Paises cargados éxitosamente");
        
    } catch (error) {
        console.log("Error al cargar los paises", error);
    }
}
seedPaises();




