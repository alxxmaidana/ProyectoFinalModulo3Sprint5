import { Router } from "express";

import { agregarPaisController, obtenerTodosLosPaisesController, buscarPaisPorIdController, editarPaisController, eliminarPaisController } from "../controllers/countriesControllers.js"

import { validacionesPaises } from "../middlewares/validations/validationsRules.js";
import { verificarErroresValidacion } from "../middlewares/validations/validationsErrors.js";

import { SUBREGIONES, ZONAS_HORARIAS } from "../controllers/countriesControllers.js";

import parsearCampos from "../middlewares/parseFields.js";

const router = Router();

// Obtener todos los países y renderizarlos en el dashboard
router.get("/", obtenerTodosLosPaisesController);

// Renderizar formulario para agregar un país
router.get("/agregar", (_req, res) => {
  res.render("form", {
    title: "Agregar País",
    pais: null,
    subregiones: SUBREGIONES,
    zonasHorarias: ZONAS_HORARIAS,
    errores: []
  });
});

// Renderizar formulario para editar un país
router.get("/:id/editar", buscarPaisPorIdController);

// Procesar formulario para editar el editar
router.put("/:id/editar", parsearCampos, validacionesPaises, verificarErroresValidacion, editarPaisController);

// Ruta pra agregar un país
router.post("/agregar", parsearCampos, validacionesPaises, verificarErroresValidacion, agregarPaisController);

// Rutar para eliminar un país
router.delete("/:id/eliminar", eliminarPaisController);

export default router;