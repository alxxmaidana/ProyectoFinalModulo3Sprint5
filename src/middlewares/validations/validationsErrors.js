import { validationResult } from "express-validator";

export const verificarErroresValidacion = (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({
			message: "Error de validación",
			errors: errors.array().map((error) => ({
				field: error.param,
				message: error.msg,
			})),
		});
	}
	next();
};