import {
    agregarPais,
    obtenerTodosLosPaises,
    buscarPaisPorId,
    editarPais,
    eliminarPais,
    obtenerDatosParaFormulario,
    verificarSiYaExisteElPais,
    upsertDatosParaFormulario,
    upsertPaisesHispanohablantes,
    formatearErrores,
    
} from "../services/countriesService.js";

import Paises from "../models/country.js";
import { validationResult } from "express-validator";

// Obtener todos los países y renderizar la vista del dashboard
export async function getDashboard(req, res) {
    try {
        const paises = await obtenerTodosLosPaises();
        // Renderizar la vista del dashboard y pasarle los países obtenidos
        res.status(200).render("dashboard", {
            title: "Dashboard de Países Hispanos de América | GeoPanel",
            paises,
            // Obtendra el mensaje y tipo de la cadena de consulta (query) sólo si redireccionamos desde el formulario de agregar o editar país, sino será null
            // Con mensaje y tipo de mensaje al redireccionar al dashboard despues de agregar/editar/eliminar, pordremos mostrar los mensaje de exito/error.
            mensaje: req.query.mensaje || null,
            tipoMensaje: req.query.tipoMensaje || null
        });
    } catch (error) {
        res.status(500).json({
            message: "Error al obtener los países de la colección:",
            error: error.message
        });
    }
}

// Renderizar el formulario para agregar un nuevo país
export async function getFormularioAgregar(_req, res) {
    try {
        // Obtener el documento con los datos para el formulario (subregiones, urls banderas y zonasHorarias);
        const datosFormulario = await obtenerDatosParaFormulario();
        res.render("addCountry", {
            title: "Agregar País",
            pais: null, // Objeto país nulo para mostrar los campos del formulario vacío
            subregiones: datosFormulario.subregiones,
            zonasHorarias: datosFormulario.zonasHorarias,
            banderas: datosFormulario.banderasURL,
            errores: {} // Objeto de errores vacío
        });
    } catch (error) {
        res.status(500).json({
            message: "Error al renderizar el formulario para agregar",
            error: error.message
        });
    }
}

// Agregar un país a la colección
export async function postFormularioAgregar(req, res) {
    try {
        // Obtener los errores de validación de express-validator, recibimo un objeto Result, que es un cotenedor de los errores de validación
        // cada errores es un objeto que contiene contiene el valor ingresado (value), el nombre del campo que falló (path) y el mansaje de error (msg)
        const resultado = validationResult(req);
        // Verificamos si hubo errores de validación
        if (!resultado.isEmpty()) {
            // Si hubo errores de validación
            // Obtener nuevamente los datos para el formulario
            const datosFormulario = await obtenerDatosParaFormulario();
            // Renderizar el formulario manteniendo los datos ingresados y mostrando los errores de validación
            return res.status(400).render("addCountry", {
                title: "Agregar País",
                pais: req.body, // Los datos ingresado por el usuario obtenidos del body
                subregiones: datosFormulario.subregiones,
                zonasHorarias: datosFormulario.zonasHorarias,
                banderas: datosFormulario.banderasURL,
                errores: formatearErrores(resultado)// Mandamos el objeto con los errores de validación
            });
        }
        const nuevoPais = new Paises(req.body);
        await agregarPais(nuevoPais);
        // Redireccionar al dashboard con un mensaje de éxito
        res.status(204).redirect("/paises?mensaje=País agregado éxitosamente&tipoMensaje=exito");
    } catch (error) {
        // Redireccionar al dashboard con un mensaje de error
        res.status(500).redirect("/paises?mensaje=Error del servidor al crear el País&tipoMensaje=error");
        console.error("Error al agregar el recursos", error);
    }
}

// Buscar país por id y mostrarlo en el formulario para editarlo
export async function getFormularioEditar(req, res) {
    try {
        const { id } = req.params;
        const pais = await buscarPaisPorId(id);
        console.log("País encontrado por id:", pais);
        // Obtener los datos para el formulario de la db (subregiones, urls banderas y zonasHorarias);
        const datosFormulario = await obtenerDatosParaFormulario();
        // Renderizar el formulario y precargar los datos del país
        res.status(200).render("editCountry", {
            title: "Editar",
            pais, // Enviamos el país encontrado para precargar los campos del formulario con sus datos
            subregiones: datosFormulario.subregiones, // Mandamos el array de subregiones para mostrar las opciones en el formulario
            zonasHorarias: datosFormulario.zonasHorarias, // Mandamos para el mismo proposito las zonas Horárias
            banderas: datosFormulario.banderasURL, // Mandamos el array de URLs de las banderas para mostrar las opciones en el formulario
            errores: {} // Array vacío de errores
        })
    } catch (error) {
        res.status(500).send({
            message: "Error al buscar el país por id",
            error: error.message
        });
    }
}

// Procesar formulario y guardar cambios del país
export async function putFormularioEditar(req, res) {
    try {
        const { id } = req.params;
        const resultado = validationResult(req);
        if (!resultado.isEmpty()) {
            const datosFormulario = await obtenerDatosParaFormulario();
            return res.status(400).render("editCountry", {
                title: `Editar ${req.body.nombre?.comun || req.body.nombreComun || 'País'}`,
                // Enviamos los paise junto con el id para no perderlo al renderizar el formulario con los errores de validación, ya que el id viene por params y no por body, entonces al renderizar el formulario con los datos del body perdemos el id, por eso lo agregamos manualmente al objeto del país.
                pais: { ...req.body, _id: id },
                subregiones: datosFormulario.subregiones,
                zonasHorarias: datosFormulario.zonasHorarias,
                banderas: datosFormulario.banderasURL,
                errores: formatearErrores(resultado)
            });
        } else {
            await editarPais(id, req.body);
            res.redirect("/paises?mensaje=País actualizado éxitosamente&tipoMensaje=exito");
        }
    } catch (error) {
        res.status(500).send({
            message: "Error al editar el país",
            error: error.message
        });
    }
}

// Eliminar un País
export async function deletePais(req, res) {
    try {
        const { id } = req.params;
        await eliminarPais(id);
        res.redirect("/paises?mensaje=País Eliminado correctamente&tipoMensaje=info");
    } catch (error) {
        res.status(500).send({
            message: "Error al eliminar el país",
            error: error.message
        });
    }
}

// Controlador para hacer el seed de los países hispanohablantes de América, URLs de banderas, zonas horarias y subregiones para el formulario.
export async function seedPaisesController(_req, res) {
    try {
        // Consumir la API de restcountries para obtener los países de América
        const response = await fetch("https://restcountries.com/v3.1/region/americas");
        // Obtener el JSON de la respuesta
        const paises = await response.json();
        // Hacer el upsert de los datos para formulario y de los países
        await upsertDatosParaFormulario(paises);
        await upsertPaisesHispanohablantes(paises);
    } catch (error) {
        throw new Error("Error al hacer el seed de los países", error);
    }
}
