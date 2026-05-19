import { body } from "express-validator";

// Parsear strings a array
const parsearCampos = (req, _res, next) => {
    const campos = ["capital", "fronteras", "zonasHorarias"];
    campos.forEach((campo) => {
        // Verificar si el campo está en el body y si es un string
        if (req.body[campo] && typeof req.body[campo] === "string") {
            // Separa en comas, elimina espacios y filtra valores falsy (null, "", undefined)
            req.body[campo] = req.body[campo].split(",").map((item) => item.trim()).filter(Boolean);
        }
    });
    next()
}

export default parsearCampos;