import { syncBuiltinESMExports } from "node:module";
import CountriesRepository from "../repositories/CountriesRepository.js";
import dotenv from "dotenv";
import Paises from "../models/country.js";
import DatosFormulario from "../models/formsData.js";
dotenv.config();

// Filtrar paises con idioma español
export function filtrarPaisesHispanohablantes(paises) {
    return paises.filter(pais => pais.languages.spa);
}

//////////////////////////////////////////////
// Obtener los datos y formatearlos al esquema
//////////////////////////////////////////////
export function mapearPaisesHispanos(paisesHispanos) {
    return paisesHispanos.map(pais => {
        // Dado que currencies es un objeto compuesto -> currencies: { USD: { symbol: ..., name: ... } }
        // El método values(object) -> obtenemos los valores del objeto currencies (symbol, name) en un array -> [{ symbol: ... , name: ... }, {..}, ...]
        const primeraMoneda = Object.values(pais.currencies)[0]; // -> primera moneda array de objetos, accedemos al primer objeto
        const moneda = primeraMoneda ? { simbolo: primeraMoneda.symbol ?? "N/A", nombre: primeraMoneda.name ?? "N/A"} : null

        // Obtener el valor de gini
        // El método entries(object) obtiene del objeto los pares clave/valor y los guarda en una matriz -> [ [clave, valor], [clave, valor] ]
        // de gini { "2019": 43.5 } -> valoresGini = [ [2019, 43.5] ]
        const valoresGini = pais.gini ? Object.entries(pais.gini)[0]: null; 
        
        // El operador ?? (coalesencia nula) devuelve el operando del lado derecho cuando el valor del izquierdo es "null" o "undefined"
        return {
            nombre: {
                comun: pais.name.nativeName.spa.common ?? pais.name.common, // Sin existe en español, se le asigna en inglés
                oficial: pais.name.nativeName.spa.official ?? pais.name.official, // Sin existe en español, se le asigna en inglés
            },
            bandera: pais.flags?.png ?? "",
            capital: pais.capital ?? [], // Ya viene cómo un array
            subregion: pais.subregion ?? "Sin Subregión", // Algunos paises no tiene subregión
            fronteras: pais.borders ?? [],
            area: pais.area ?? 0,
            poblacion: pais.population ?? 0,
            zonasHorarias: pais.timezones ?? [],
            moneda: moneda,
            indiceGini: valoresGini ? { anio: Number(valoresGini[0]), valor: valoresGini[1] } : undefined,
        }
    });
}

// Instanciar y llamar al método para guardar los paises
export async function cargarPaisesHispanohablantes(paisesHispanos) {
    const paises = paisesHispanos.map(pais => new Paises(pais));
    return await CountriesRepository.cargarPaisesHispanos(paises);
}

// Llamár el método para agregar el país
export async function agregarPais(paisAgregar) {
    return await CountriesRepository.agregar(paisAgregar);
}

// Crear filtro y llamar al método para obtener todos los países de la colección
export async function obtenerTodosLosPaises() {
    const condicion = { $and: [ {tipoDocumento: "pais"}, {creador: process.env.CREATOR} ]};
    return await CountriesRepository.obtenerTodos(condicion);
}

// Llamar al método para buscar un país por id
export async function buscarPaisPorId(id) {
    return await CountriesRepository.buscarPorId(id);
}

// Llamar método para actualizar el documento
export async function editarPais(id, paisActualizado) {
    return await CountriesRepository.editar(id, paisActualizado);
}

// Llamar método para eliminar el recurso
export async function eliminarPais(id) {
    return await CountriesRepository.eliminar(id);
}

// Función para obtener las URLs de banderas, zonasHorarias y subregiones de los países de América
export function recopilarDatosParaFormulario(paises) {
    let banderasURL = [];
    let zonasHorarias = [];
    let subregiones = [];

    // Obtener URLs del png de las banderas
    paises.forEach((pais) => {
        banderasURL.push(pais.flags.png);
        // Obtener zonas horarias
        const zonasHorariasPais = pais.timezones;
        for (let i = 0; i < zonasHorariasPais.length; i++) {
            // Si alguna zona horaria del país no esta en zonasHorarias la incluye
            if (!zonasHorarias.includes(zonasHorariasPais[i])){ 
                zonasHorarias.push(zonasHorariasPais[i])
            }
        } 
        // Obtener subregiones
        const subregionPais = pais.subregion;
        // Si subregion no están en el array la agrega
        if (!subregiones.includes(subregionPais)) {
            subregiones.push(subregionPais)
        }
    });
    // Agregar un valor más al array de subregiones
    subregiones.push("Sin Subregión");

    // Retorarlo cómo un objeto
    return { banderasURL, zonasHorarias, subregiones };
}

// Instanciar y llamar método para guardar el documento con los datos para formulario
export async function guardarDatosParaFormulario(paisesData) {
    const data = new DatosFormulario(paisesData)
    return await CountriesRepository.guardarDatosFormulario(data);
}

// Obtener data
export async function obtenerDatosParaFormulairo() {
    const condicion = { $and: [ { tipoDocumento: "data", creador: process.env.CREATOR } ] };
    return await CountriesRepository.DatosFormulario(condicion);
}
