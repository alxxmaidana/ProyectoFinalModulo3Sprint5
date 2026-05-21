import { Router } from "express";

import {
  getDashboard,
  getFormularioAgregar,
  postFormularioAgregar,
  getFormularioEditar,
  putFormularioEditar,
  deletePais,
} from "../controllers/countriesControllers.js"

// import validarCampos from "../middlewares/validations/validationsRules.js"

import parsearCampos from "../middlewares/parseFields.js";
import validacionesPaises from "../middlewares/validationsRules.js"

const router = Router();

// Obtener todos los países y renderizarlos en el dashboard
router.get("/", getDashboard);

// Renderizar formulario para agregar un país
router.get("/agregar", getFormularioAgregar);

// Renderizar formulario para editar un país
router.get("/:id/editar", getFormularioEditar);

// Procesar formulario para editar el editar
router.put(
  "/:id/editar",
  parsearCampos,
  validacionesPaises,
  putFormularioEditar
);

// Ruta para agregar un país
router.post("/agregar", parsearCampos, validacionesPaises, postFormularioAgregar);
// router.post("/agregar", parsearCampos, agregarPaisController);

// Ruta para eliminar un país
router.delete("/:id/eliminar", deletePais);

export default router;