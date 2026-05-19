import { conectarDB } from "../config/DBConfig.js";
import { cargarPaisesHispanohablantes, filtrarPaisesHispanohablantes, guardarDataPaises, mapearPaisesHispanos, obtenerDatosPaises} from "../services/countriesService.js";

// Función para cargar los datos inciales de la App a la base de datos
// Guarda los países hispanohablantes de América y un documento que recopila, las URL de banderas, subregiones y zonasHorarias.
async function seedPaises() {
    try {
        await conectarDB();
        const response = await fetch("https://restcountries.com/v3.1/region/americas");
        const paises = await response.json();
        // Recopilar las urls, subregiones y zonasHorarias
        const datosRecopilados = obtenerDatosPaises(paises);
        // Guardar los datos recopilados a la colección de mongo
        await guardarDataPaises(datosRecopilados);
        // Filtrar los países obtenido por idioma español
        const paisesHispanos =  filtrarPaisesHispanohablantes(paises);
        // Filtrar y formatear campos necesarios para el esquema
        const paisesMapeados =  mapearPaisesHispanos(paisesHispanos);
        // Agregar los paises a la colección de mongo
        await cargarPaisesHispanohablantes(paisesMapeados);
        console.log("Datos de paises cargados éxitosamente");
    } catch (error) {
        console.log("Error al cargar los datos de los paises", error);
    }
}

seedPaises();