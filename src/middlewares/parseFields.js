import { body } from "express-validator";

const parsearCampos = (req, _res, next) => {
    // Convertir campos strings a array 
    const campos = ["capital", "fronteras", "zonasHorarias"];
    campos.forEach((campo) => {
        // Verificar si el campo está en el body y si es un string
        if (req.body[campo] && typeof req.body[campo] === "string") {
            // Separa en comas, elimina espacios y filtra valores falsy (null, "", undefined)
            req.body[campo] = req.body[campo].split(",").map((item) => item.trim()).filter(Boolean);
            // Si el campo es fronteras convertir los valores a mayúsculas
            if (req.body[campo] === req.body["fronteras"]) {
                req.body[campo] = req.body[campo].map((item) => item.toUpperCase())
            }
            console.log(req.body[campo])
        }
    });
    next()
}

export default parsearCampos;