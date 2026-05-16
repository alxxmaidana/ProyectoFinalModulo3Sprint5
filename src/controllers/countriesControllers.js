import { agregarPais, obtenerTodosLosPaises } from "../services/countriesService.js";
import Paises from "../models/country.js";

export async function agregarPaisController(req, res) {
    try {
        const paisAgregar = new Paises(req.body);
        await agregarPais(paisAgregar);
        res.status(200).send({ message: "País agregado correctamente" })
    } catch (error) {
        res.status(500).send({
			mesagge: "Error al agregar el País",
			error: error.mesagge,
		});
    }
}

// Obtener todos los países de la colección
export async function obtenerTodosLosPaisesController(_req, res) {
    try {
        const paisesObtenidos = await obtenerTodosLosPaises();
        if (paisesObtenidos.length === 0) {
            return res.status(404).send({message: "No se encontró ningún pais"})
        }
        paisesObtenidos.forEach(pais => {
            console.log("PAIS:", pais.nombre.comun);
        })
        console.log("--------------------------------")
        console.log("cantidad: ", paisesObtenidos.length);
        res.status(204).send()
    } catch (error) {
        res.status(500).send({
            message: "Error interno del servidor al intentar obtener todos los países",
            error: error.message
        })
    }
}