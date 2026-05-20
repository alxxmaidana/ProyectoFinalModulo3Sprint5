import { validationResult } from "express-validator";

// Middleware para verificar los errores de validación
export const verificarErroresValidacion = (req, res, next) => {
	const errores = validationResult(req);
	console.log("Errores", errores.array());
	// Si hubo errores de validación 
	if (!errores.isEmpty()) {
		// Guardar los errores en req.errores para que estén disponibles en el controlador
		req.errores = errores.array();
		// console.log("Errores de validación encontrados:", req.errores);
	}
	next();
};