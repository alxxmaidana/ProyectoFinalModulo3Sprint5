import IRepository from "./IRepository.js";
import Paises from "../models/country.js";
import DatosFormulario from "../models/formsData.js"

class CountriesRepository extends IRepository {
    // Obtener todos los países de la colección
    async obtenerTodos() {
        const filtro = { $and: [{ tipoDocumento: "pais" }, { creador: process.env.CREATOR }] };
        return await Paises.find(filtro);
    }

    async agregar(paisAgregar) {
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
    async obtenerDatosFormulario() {
        const filtro = { $and: [{ tipoDocumento: "data", creador: process.env.CREATOR }] };
        // findOne, porque solo existe un documento en la colección, si usamos find() nos devuelve un array con un solo elemento.
        return await DatosFormulario.findOne(filtro)
    }

    // Reemplazar el país si ya existe, o agegarlos si no existe.
    async upsertPais(paisesFormateados) {
        // Hacemos un upsert de cada país creando un filtro con su nombre oficial
        // map() devuelve un nuevo array con el resultado del upsert de cada país, que son promesas. Retornamos el array de promesas al servicio
        // Promise.all() espera a que se resuelvan todas las promesas del array, es decir, a que se hagan todos los upsert.
        return await Promise.all(paisesFormateados.map(async (pais) => {
            const filtro = {
                $and: [{
                    "nombre.oficial": pais.nombre.oficial,
                    tipoDocumento: "pais",
                    creador: process.env.CREATOR
                }]
            };
            // Hacemos el upsert del país, si ya existe lo reemplaza, sino lo crea.
            return await Paises.replaceOne(filtro, pais, { upsert: true });
        }));
    }

    // Reemplazar el documento con datos para formulario si ya existe 
    async upsertDatosFormulario(documento) {
        const filtro = { $and: [{ tipoDocumento: "data", creador: process.env.CREATOR }] };
        return await DatosFormulario.replaceOne(filtro, documento, { upsert: true });
    }
    // Upsert: true -> Es clave para guardar el documento si no éxiste


    // Verificar si el país y existe en la colección
    async verificarSiYaExiste() {
        const filtro = { $and: [{ tipoDocumento: "pais", creador: process.env.CREATOR, "nombre.oficial": nombreOficial }] }
        // Con el método exists() verificamos si ya existe el país con el filtro definido en el servicio
        // Es mas rápido y eficiente que el método find() o findOne() por que solo devuelve un booleano y su _id
        return await Paises.exists(filtro);
    }
}

export default new CountriesRepository();