import { Router } from "express";

import { agregarPaisController, obtenerTodosLosPaisesController } from "../controllers/countriesControllers.js"

import { validacionesPaises } from "../middlewares/validations/validationsRules.js";
import { verificarErroresValidacion } from "../middlewares/validations/validationsErrors.js";

const router = Router();

// Endpoint para obtener todos los países y renderizarlos en el dasbhoard

// Renderizar vista principal
router.get("/", (_req, res) => {
    res.render("indexDashboard", { title: "Vista principal" });
});

// Endpoint para verificar validaciones en el backend
router.post("/paises/agregar", validacionesPaises, verificarErroresValidacion, agregarPaisController);

export default router;