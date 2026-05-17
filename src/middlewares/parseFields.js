const convertirStringsAArray = (req, _res, next) => {
    const campos = ["capital", "fronteras", "zonasHorarias"];
    campos.forEach((campo) => {
        // Verificar si campo está en el body y si es un string
        if (req.body[campo] && typeof req.body[campo] === "string") {
            // Separa en comas, elimina espacios y filtra valores falsy (null, "", undefined)
            req.body[campo].split(",").map((item) => item.trim().filter(Boolean))
        }
    });
    next(); // Continuar el flujo de la petición
}

export default convertirStringsAArray;