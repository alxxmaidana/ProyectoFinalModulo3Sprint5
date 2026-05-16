import { agregarPais } from "../services/countriesService.js";
import Paises from "../models/country.js";

export async function agregarPaisController(req, res) {
    try {
        const paisAgregar = new Paises(req.body);
        await agregarPais(paisAgregar);
        res.status(200).send({ message: "País agregado correctamente" })
    } catch (error) {
        res.status(500).send({
			mesagge: "Error al agregar el País",
			err: err.mesagge,
		});
    }
}