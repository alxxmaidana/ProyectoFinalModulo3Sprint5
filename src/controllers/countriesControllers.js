import { agregarPais, obtenerTodosLosPaises, buscarPaisPorId, editarPais, eliminarPais } from "../services/countriesService.js";
import Paises from "../models/country.js";

// Constantes para formularios
export const SUBREGIONES = [
  "Sin Subregión",
  "South America",
  "Central America",
  "North America",
  "Caribbean",
];
 
export const ZONAS_HORARIAS = [
  "UTC-03:00",
  "UTC-04:00",
  "UTC-05:00",
  "UTC-06:00",
  "UTC-07:00",
  "UTC-08:00",
  "UTC-09:00",
];

// Obtener todos los países de la colección
export async function obtenerTodosLosPaisesController(req, res) {
    try {
        const paises = await obtenerTodosLosPaises();
        res.status(200).render("dashboard", {
            title: "Listado de superhéroes hispanos",
            paises,
            mensaje: req.query.mensaje || null,
            tipoMensaje: req.query.tipoMensaje || null
        });
    } catch (error) {
        res.status(500).json({
            message: "Error al obtener los paíse de la colección:",
            error: error.message
        });
    }
}

// Agregar un país a la colección
export async function agregarPaisController(req, res) {
    try {
        const paisAgregar = new Paises(req.body);
        await agregarPais(paisAgregar);
        console.log("Pais agregado correctamente")
        res.redirect("/paises?mensaje=País creado éxitosamente&tipoMensaje=exito");
    } catch (error) {
        res.redirect("/paises?mensaje=Error del servidor al crear el País&tipoMensaje=error");
        console.log("Error al agregar el recursos", error);
    }
}

// Buscar país por id
export async function buscarPaisPorIdController(req, res) {
    try {
        const { id } = req.params;
        const pais = await buscarPaisPorId(id);
        res.render("form", {
            title: `Editar ${pais.nombre.comun}`,
            pais,
            subregiones: SUBREGIONES,
            zonasHorarias: ZONAS_HORARIAS,
            errores: []
        })
    } catch (error) {
        res.status(500).send({
            message: "Error al buscar el país por id",
            error: error.message
        });
    }
}

// Procesar formulario y guardar cambios del país
export async function editarPaisController(req, res) {
    try {
        const { id } = req.params;
        const paisActualizado = await editarPais(id, req.body);
        res.status(200).send({paisActualizado})
    } catch (error) {
        res.status(500).send({
            message: "Error al editar el país",
            error: error.message
        });
    }   
}

// Eliminar un País
export async function eliminarPaisController(req, res) {
    try {
        const { id } = req.params;
        await eliminarPais(id);
        res.status(200).send({ mensaje: "País eliminado éxitosamente" });
    } catch (error) {
        res.status(500).send({
            message: "Error al eliminar el país",
            error: error.message
        });
    }
} 