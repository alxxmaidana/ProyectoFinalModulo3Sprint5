import IRepository from "./IRepository.js";
import Paises from "../models/country.js";

// Implementar métodos de la interfaz
class CountriesRepository extends IRepository {
    // Agregar todos los paises de una sola vez
    async cargarPaisesHispanos(paises) {
        return await Paises.insertMany(paises);
    }

    async obtenerTodos(condicion) {
        return await Paises.find(condicion);
    }

    async agregar(paisAgregar){
        return await paisAgregar.save();
    }

    async buscarPorId(id) {
        return await Paises.findById(id);
    }

    async eliminar(id) {
        return await Paises.findByIdAndDelete(id);
    }

    async editar(id, paisActualizado) {
        return await Paises.findByIdAndUpdate(id, paisActualizado, { returnDocument: "after" });
    }
}

// Crear una instancia de CountriesRepository y exportarlo globalmente
export default new CountriesRepository();