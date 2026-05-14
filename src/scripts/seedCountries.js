import { conectarDB } from "../db/DBConfig.js";
import { filtrarPaisesHispanohablantes } from "../services/countriesService.js";


async function cargarPaises() {
    try {
        await conectarDB();
        const response = await fetch("https://restcountries.com/v3.1/region/americas");
        const paises = await response.json();
        // Enviar paises al servicio filtrarlos y agregarlos
        const paisesFiltrados = filtrarPaisesHispanohablantes(paises);
         
    } catch (error) {
        console.log("Error al cargar los paises", error);
    }
}

cargarPaises();