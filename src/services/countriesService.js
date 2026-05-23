import CountriesRepository from "../repositories/CountriesRepository.js";
import dotenv from "dotenv";
import Paises from "../models/country.js";
import DatosFormulario from "../models/formsData.js";
import { validationResult } from "express-validator";
dotenv.config();

//////////////////////////////////////////////
// Obtener los datos y formatearlos al esquema
//////////////////////////////////////////////
function filtrarYFormatearCamposPaisesHispanos(paisesHispanos) {
    return paisesHispanos.map(pais => {
        // Dado que currencies es un objeto compuesto -> currencies: { USD: { symbol: ..., name: ... } }
        // El método values(object) -> Obtenemos los valores del objeto currencies (symbol, name) y los guardamos en un array -> [{ symbol: ... , name: ... }, {..}, ...]
        // Luego acceder al primer elemento del array (primera moneda del país) y obtenmos su símbolo y nombre
        const primeraMoneda = Object.values(pais.currencies)[0];
        const moneda = primeraMoneda ? { simbolo: primeraMoneda.symbol ?? "N/A", nombre: primeraMoneda.name ?? "N/A" } : null

        // Obtenemos el valor y el año del indice de Gini
        // El indice de Gini viene cómo un objeto con el año como clave y el valor como valor -> gini: { "2019": 43.5 }
        // Con el método entries(object) obtenemos del objeto los pares clave/valor (en este caso el año y el valor del índice) y los guarda en una matriz -> [ [clave, valor] ]
        // Obtenemos -> [ ["2019", 43.5] ], y accedemos al primer y único elemento del array
        const valoresGini = pais.gini ? Object.entries(pais.gini)[0] : null;

        // El operador ?? (coalesencia nula) devuelve el operando del lado derecho cuando el valor del izquierdo es "null" o "undefined"
        return {
            nombre: {
                // Intentamos obtener el nombre común y oficial en español, si no lo tiene le asignamos el nombre común y oficial general (en inglés)
                comun: pais.name.nativeName.spa.common ?? pais.name.common,
                oficial: pais.name.nativeName.spa.official ?? pais.name.official,
            },
            bandera: pais.flags.png ?? "",
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

function ordernarZonasHorarias(zonasHorarias) {
    // Ordenar las zonas horarias alfabéticamente
    return zonasHorarias.sort((a, b) => a.localeCompare(b));
}

// Para recoplira los datos para el formulario de agregar/editar país.
function recopilarDatosParaFormulario(paises) {
    let banderasURL = [];
    let zonasHorarias = [];
    let subregiones = [];

    // Recorre cada país
    paises.forEach((pais) => {
        // Obtenemos la URL del PNG de la bandera y la agregamos al array de banderasURL
        banderasURL.push(pais.flags.png);
        // Obtenemos las zonas horarias del país y las agregamos al array de zonasHorarias, asegurando que no se repitan
        const zonasHorariasPais = pais.timezones;
        for (let i = 0; i < zonasHorariasPais.length; i++) {
            // Si la zona horaria no está en el array, la agrega
            if (!zonasHorarias.includes(zonasHorariasPais[i])) {
                zonasHorarias.push(zonasHorariasPais[i])
            }
        }
        // Obtenemos la subregión del país y la agregamos al array de subregiones, asegurando que no se repitan
        const subregionPais = pais.subregion;
        if (!subregiones.includes(subregionPais)) {
            subregiones.push(subregionPais)
        }
    });
    // Agregar la opción "Sin Subregión" al array de subregiones, para los países que no tienen subregión.
    subregiones.push("Sin Subregión");
    zonasHorarias = ordernarZonasHorarias(zonasHorarias);
    return { banderasURL, zonasHorarias, subregiones };
}

// Servicio para hacer el upsert de los datos para el formulario, recopilando las URLs de las banderas, las zonas horarias y las subregiones.
export async function upsertDatosParaFormulario(paises) {
    const datosRecopilados = recopilarDatosParaFormulario(paises);
    return await CountriesRepository.upsertDatosFormulario(datosRecopilados);
}

// Filtrar paises de América por idoma español
function filtrarPaisesHispanohablantes(paises) {
    return paises.filter(pais => pais.languages.spa);
}

// Servicio para hacer el upsert de cada país hispanohablante de América, filtrando y formateando los datos al esquema definido en el modelo.
export async function upsertPaisesHispanohablantes(paises) {
    const paisesHispanos = filtrarPaisesHispanohablantes(paises);
    const paisesFormateados = filtrarYFormatearCamposPaisesHispanos(paisesHispanos);
    return await CountriesRepository.upsertPais(paisesFormateados);
}

// Llamár el método para agregar el país
export async function agregarPais(paisAgregar) {
    return await CountriesRepository.agregar(paisAgregar);
}

// Crear filtro y llamar al método para obtener todos los países de la colección
export async function obtenerTodosLosPaises() {
    return await CountriesRepository.obtenerTodos();
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

// Obtener los datos para los forumarios de agregar y editar países
export async function obtenerDatosParaFormulario() {
    return await CountriesRepository.obtenerDatosFormulario();
}

// Servicio para verficiar si ya existe el país con el filtro definido
export async function verificarSiYaExisteElPais(nombreOficial) {
    return await CountriesRepository.verificarSiYaExiste();
}

// Verificar si hubo errores de validación, crear el objeto de errores
export function formatearErrores(resultado) {
    const errores = {};
    resultado.array().forEach((error) => {
        // Crear pares claves valor con los campos path (nombre del campo que falló) y msg (el mensaje de error), agregarlas al objeto errores, 
        // en cada iteración obtengo { path: msg } -> ej: { area: "En área no puede ser negativa" };
        errores[error.path] = error.msg;
    });
    // Despues de iterar todo el array resultado obtengo: 
    // errores = { { area: "El area no puede ser negativa" }, { 'nombre.oficial': "El nombre oficial debe tener alménos 3 caracteres" } }
    console.log("Errores formateados: ", errores)
    return errores;
}