import { body } from "express-validator";

// Middleware para parsear los campos capital, fronteras y zonasHorarias, que vienen como strings a arrays
// Cuando se envía el formulario los datos de los inputs llegan cómo strings al backend
const parsearCampos = (req, _res, next) => {
    const campos = ["capital", "fronteras", "zonasHorarias"];
    // Recorre los campos, verifica si están en el body y si son strings, los separa por comas, elimina espacios y filtra valores falsy (null, "", undefined)
    campos.forEach((campo) => {
        if (req.body[campo] && typeof req.body[campo] === "string") {
            req.body[campo] = req.body[campo].split(",").map((item) => item.trim()).filter(Boolean);
        }
    });
    next()
}

export default parsearCampos;