import IRepository from "./IRepository.js";
import Paises from "../models/country.js";
import DatosFormulario from "../models/formsData.js"

class CountriesRepository extends IRepository {

    // Implementación método guardar los países hispanos de América
    async cargarPaisesHispanos(paises) {
        return await Paises.insertMany(paises);
    }

    // Obtener todos los países de la colección
    async obtenerTodos(filtro) {
        return await Paises.find(filtro);
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
        return await Paises.findByIdAndUpdate(id, paisActualizado);
    }

    // Obtener el documento que contiene los datos para los formularios (banderasURL, zonasHorarias y subregiones)
    async obtenerDatosFormulario(filtro) {
        // findOne, porque solo existe un documento en la colección, si usamos find() nos devuelve un array con un solo elemento.
        return await DatosFormulario.findOne(filtro)    
    }

    // Guardar el documento con los datos para formulario
    async guardarDatosFormulario(data) {
        return await data.save();
    }

    // Reemplazar el país si ya existe, o agegarlos si no existe.
    async upsertPais(filtro, pais) {
        return await Paises.replaceOne(filtro, pais, { upsert: true });
    }

    // Reemplazar el documento con datos para formulario si ya existe 
    async upsertDatosFormulario(filtro, documento) {
        return await DatosFormulario.replaceOne(filtro, documento, { upsert: true });
    }
    // Upsert: true -> Es clave para guardar el documento si no éxiste
    

    // Verificar si el país y existe en la colección
    async verificarSiYaExiste(filtro) {
        // Con el método exists() verificamos si ya existe el país con el filtro definido en el servicio
        // Es mas rápido y eficiente que el método find() o findOne() por que solo devuelve un booleano y su _id
        return await Paises.exists(filtro);
    }
}

export default new CountriesRepository();