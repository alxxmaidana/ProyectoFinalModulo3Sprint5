import CountriesRepository from "../repositories/CountriesRepository.js";

export function filtrarPaisesHispanohablantes(paises) {
    return paises.filter(pais => pais.languages?.spa);
}
