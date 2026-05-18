import CountriesRepository from "../repositories/CountriesRepository.js";
import dotenv from "dotenv";
dotenv.config();

// Filtrar paises con idioma español
export function filtrarPaisesHispanohablantes(paises) {
    return paises.filter(pais => pais.languages?.spa);
}

//////////////////////////////////////////////
// Convertir los paises al esquema definido
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

// Cargar todos los paíse hispanos de américa de la API
export async function cargarPaisesHispanohablantes(paises) {
    return await CountriesRepository.cargarPaisesHispanos(paises);
}

// Llamar al repositorio para agregar el país
export async function agregarPais(paisAgregar) {
    return await CountriesRepository.agregar(paisAgregar);
}

// Obtener todos los países de la colección
export async function obtenerTodosLosPaises() {
    const condicion = { $and: [ {tipoDocumento: "pais"}, {creador: process.env.CREATOR} ]};
    return await CountriesRepository.obtenerTodos(condicion);
}

// Buscar un país por id
export async function buscarPaisPorId(id) {
    return await CountriesRepository.buscarPorId(id);
}

// Editar un país por id
export async function editarPais(id, paisActualizado) {
    return await CountriesRepository.editar(id, paisActualizado);
}

// Eliminar un país por id
export async function eliminarPais(id) {
    return await CountriesRepository.eliminar(id);
}