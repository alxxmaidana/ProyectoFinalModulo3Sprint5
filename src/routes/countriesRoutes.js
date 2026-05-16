import { Router } from "express";

import { agregarPaisController } from "../controllers/countriesControllers.js"

import { validacionesPaises } from "../middlewares/validations/validationsRules.js";
import { verificarErroresValidacion } from "../middlewares/validations/validationsErrors.js";

const router = Router();

// Endpoint para verificar validaciones en el backend
router.post("/paises/agregar", validacionesPaises, verificarErroresValidacion, agregarPaisController);

export default router;