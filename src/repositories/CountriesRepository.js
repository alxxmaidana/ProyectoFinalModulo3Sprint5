import IRepository from "./IRepository.js";
import Paises from "../models/country.js";

class CountriesRepository extends IRepository {
    // Agregar todos los paises de una sola vez
    async cargarPaisesHispanohablantes(paises) {
        return await Paises.insertMany(paises);
    }

    
}

// Crear una instancia de CountriesRepository y exportarlo globalmente
export default new CountriesRepository();