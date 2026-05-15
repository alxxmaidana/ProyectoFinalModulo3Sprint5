import CountriesRepository from "../repositories/CountriesRepository.js";

// Filtrar paises con idioma español
export function filtrarPaisesHispanohablantes(paises) {
    return paises.filter(pais => pais.languages?.spa);
}

//////////////////////////////////////////////
// Convertir los paises al esquema definido
//////////////////////////////////////////////
export function mapearPaisesHispanos(paisesHispanos) {
    return paisesHispanos.map(pais => {
        // Dado que currencies es un objeto -> currencies: { USD: { symbol: ..., name: ... } }
        // Object.values() -> Obtiene los valores (symbol, name) de currencies y luego los recorre con map
        // monedas: [{ simbolo, nombre }, { simbolo, nombre }]
        const monedas = pais.currencies
            ? Object.values(pais.currencies).map((moneda) => ({
                simbolo: moneda.symbol ?? "N/A",
                nombre: moneda.name ?? "N/A",
            }))
            : [];
        // Obtener el valor de gini / Object.entries(transforma un objeto en un array) y accedemos al primer (y único valor), devuelve -> [2019, 53.3]
        const valoresGini = pais.gini ? Object.entries(pais.gini)[0] : null;
        // El operador ?? (coalesencia nula) devuelve el operando del lado derecho cuando el valor del izquierdo es "null" o "undefined"
        return {
            nombre: {
                comun: pais.name.nativeName.spa.common ?? pais.name.common, // Sin existe en español, se le asigna en inglés
                oficial: pais.name.nativeName.spa.official ?? pais.name.official, // Sin existe en español, se le asigna en inglés
            },
            bandera: pais.flags?.png ?? "",
            independiente: pais.independent ?? false,
            capital: pais.capital ?? [], // Ya viene cómo un array
            subregion: pais.subregion ?? "Sin Subregión", // Algunos paises no tiene subregión
            conSalidaAlMar: !pais.landlocked ?? false, // invertir el valor
            fronteras: pais.borders ?? [],
            area: pais.area ?? 0,
            poblacion: pais.population ?? 0,
            zonasHorarias: pais.timezones ?? [],
            monedas,
            indiceGini: valoresGini ? { anio: Number(valoresGini[0]), valor: valoresGini[1] } : undefined,
        }
    });
}

export async function cargarPaisesHispanos(paises) {
    return await CountriesRepository.cargarPaisesHispanohablantes(paises);
}