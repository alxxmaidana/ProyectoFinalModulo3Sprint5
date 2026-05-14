import IRepository from "./IRepository.js";
import Paises from "../models/country.js";

class CountriesRepository extends IRepository {
    // Agregar todos los paises de una sola vez
    async cargarPaisesHispanohablantes(paisesHispanos) {
        await Paises.insertMany(paisesHispanos);
    }
}

export default CountriesRepository;