import { Router } from "express";

import { 
  agregarPaisController, 
  obtenerTodosLosPaisesController,
  buscarPaisPorIdController,
  editarPaisController,
  eliminarPaisController,
  renderizarFormularioAgregar
} from "../controllers/countriesControllers.js"

import { validacionesPaises } from "../middlewares/validations/validationsRules.js";
import { verificarErroresValidacion } from "../middlewares/validations/validationsErrors.js";

import parsearCampos from "../middlewares/parseFields.js";

const router = Router();

// Obtener todos los países y renderizarlos en el dashboard
router.get("/", obtenerTodosLosPaisesController);

// Renderizar formulario para agregar un país
router.get("/agregar", renderizarFormularioAgregar);

// Renderizar formulario para editar un país
router.get("/:id/editar", buscarPaisPorIdController);

// Procesar formulario para editar el editar
router.put("/:id/editar", parsearCampos, validacionesPaises, verificarErroresValidacion, editarPaisController);

// Ruta pra agregar un país
router.post("/agregar", parsearCampos, validacionesPaises, verificarErroresValidacion, agregarPaisController);

// Rutar para eliminar un país
router.delete("/:id/eliminar", eliminarPaisController);

export default router;