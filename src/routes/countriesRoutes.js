import { Router } from "express";

import { agregarPaisController, obtenerTodosLosPaisesController } from "../controllers/countriesControllers.js"

import { validacionesPaises } from "../middlewares/validations/validationsRules.js";
import { verificarErroresValidacion } from "../middlewares/validations/validationsErrors.js";

import { SUBREGIONES, ZONAS_HORARIAS } from "../controllers/countriesControllers.js";

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

// router.post("/agregar", )

// Endpoint para verificar validaciones en el backend
router.post("/paises/agregar", validacionesPaises, verificarErroresValidacion, agregarPaisController);

export default router;