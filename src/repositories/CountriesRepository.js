import IRepository from "./IRepository.js";
import Paises from "../models/country.js";
import PaisesData from "../models/countriesData.js"

// Implementar métodos de la interfaz
class CountriesRepository extends IRepository {
    // Guardar los paises hispanos de america a la colección
    async cargarPaisesHispanos(paises) {
        return await Paises.insertMany(paises);
    }

    // Obtener todos los paises de la colección
    async obtenerTodos(filtro) {
        return await Paises.find(filtro);
    }

    // Agregar un país a la colección
    async agregar(paisAgregar){
        return await paisAgregar.save();
    }

    // Buscar un país por su id
    async buscarPorId(id) {
        return await Paises.findById(id);
    }

    // Eliminar un país por si id
    async eliminar(id) {
        return await Paises.findByIdAndDelete(id);
    }

    // Actualizar documento por id
    async editar(id, paisActualizado) {
        return await Paises.findByIdAndUpdate(id, paisActualizado);
    }

    // Obtener docuemento con los datos para formulario
    async obtenerData(condicion) {
        return await PaisesData.find(condicion)     
    }

    // Guardar documento con los datos para formulario
    async guardarData(data) {
        return await data.save();
    }
}

export default new CountriesRepository();