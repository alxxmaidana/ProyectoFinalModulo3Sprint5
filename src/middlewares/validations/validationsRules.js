import { body } from "express-validator";

export const validacionesPaises = [
    // Validar nombre.comun
    body("nombre.comun")
        .trim() // Eliminar los espacios el blanco al inicio y final
        .notEmpty().withMessage("El nombre común es obligatorio") // Validar que campo no esté vació
        .bail()
        .isString().withMessage("El nombre común debe ser un texto")
        .bail() // bail() -> Detiene la ejecución de la cadena de validaciones si la validación falló
        .isLength({ min: 3 }).withMessage("El nombre común debe tener un mínimo de 3 caractéres") // Que tenga un mínimo de 3 caractéres
        .bail()
        .isLength({ max: 90 }).withMessage("El nombre común no puede superar los 60 caractéres"), // Que tenga un máximo de 90 caractéres

    // Validar nombre.oficial
    body("nombre.oficial")
        .trim()
        .notEmpty().withMessage("El nombre oficial es obligatorio")
        .bail()
        .isString().withMessage("El nombre oficial debe ser un texto")
        .bail()
        .isLength({ min: 3 }).withMessage("El nombre oficial debe tener un mínimo de 3 caractéres")
        .bail()
        .isLength({ max: 90 }).withMessage("El nombre oficial no puede superar los 90 caractéres"),

    // Validar URL de la bandera
    body("bandera")
        .optional({ values: "falsy" })  // ← ignora "", null, undefined, 0
        .trim()
        .isURL().withMessage("El campo bandera debe ser una URL válida"),

    // Validar el array capital
    body("capital")
        // Validar que no sea una array vacio
        .isArray({ min: 1 }).withMessage("La capital es obligatoria")
        // Validar que cada capital sea un texto (string)
        .custom((capitales) => {
            if (capitales.some((capital) => typeof capital !== "string")) {
                throw new Error("Cada capital debe ser un texto")
            }
            return true;
        }),
    body("capital.*")
        .trim(),
    body("capital")
        // Validar que cada capital supere los 3 caracteres
        .custom((capitales) => {
            if (capitales.some((capital) => capital.length < 3)) {
                throw new Error("Cada capital debe tener almenos 3 caractéres")
            }
            return true;
        })
        .bail()
        // Validar que cada capital no supero los 90 caracteres
        .custom((capitales) => {
            if (capitales.some((capital) => capital.length > 90)) {
                throw new Error("Cada capital no puede superara los 90 caractéres")
            }
            return true;
        }),

    // Validar subregión
    body("subregion")
        .trim()
        .notEmpty().withMessage("La subregión es obligatoria")
        .bail()
        .isIn([ // Validar que el valor del campo se alguno de los siguientes
            "Sudamérica",
            "América Central",
            "El Caribe (América Insular)",
            "Norteamérica",
            "Sin Subregión",
            "South America",
            "Central America",
            "North America",
            "Caribbean"
        ]).withMessage("Subregión inválida"),

    // Validar las fronteras 
    body("fronteras.*") // Eliminar espacios en blanco de cada país de frontereas
        .trim(),
    // Validar que todos los países sean solo letras
    body("fronteras")
        .optional()
        .custom(fronteras => {
            if (fronteras.some(pais => !pais.match(/^[A-Za-z\s]+$/))) {
                throw new Error("Cada país debe contener sólo letras");
            }
            return true;
        }),
    // Validar longitud exácta de cada país
    body("fronteras")
        .optional()
        .custom(fronteras => {
            if (fronteras.some(pais => pais.length !== 3)) {
                throw new Error("El código de cada país debe tener exactamente 3 caracteres");
            }
            return true;
        }),

    // Validar área del país
    body("area")
        .trim()
        .notEmpty().withMessage("El área del país es obligatório")
        .bail()
        .isNumeric().withMessage("El área del país debe ser un número")
        .bail()
        .custom(value => { // Validar que no sea negativo
            if (Number(value) < 0) {
                throw new Error("El área del país no puede ser negativo")
            }
            return true;
        }),

    // Validar poblacion
    body("poblacion")
        .trim()
        .notEmpty().withMessage("La cantidad de habitantes del país es obligatória")
        .bail()
        .isNumeric().withMessage("La cantidad de habitantes debe ser un número")
        .bail()
        .custom(value => { // Validar que no sea negativo
            if (Number(value) < 0) {
                throw new Error("La cantidad de habitantes del país no puede ser negativa")
            }
            return true;
        }),

    // Validar zonas horárias
    body("zonasHorarias")
        // Verificar que tenga almenos una zona horaria
        .isArray({ min: 1 }).withMessage("Eliga almenos una zona horária"),
    // Validar cada zona horaria 
    body("zonasHorarias.*")
        .trim()
        .isIn(["UTC-03:00", "UTC-04:00", "UTC-05:00", "UTC-06:00", "UTC-07:00", "UTC-08:00", "UTC-09:00"])
        .withMessage("Zona horária invalida"),

    // Validar monedas 
    body("moneda.simbolo")
        .trim()
        .notEmpty().withMessage("El símbolo de la moneda es requerido")
        .bail()
        .isString().withMessage("El símbolo de la moneda debe ser un texto")
        .bail()
        .isLength({ max: 5 }).withMessage("El símbolo no puede superar los 5 caracteres"),
    body("moneda.nombre")
        .trim()
        .notEmpty().withMessage("El nombre de la moneda es requerido")
        .bail()
        .isString().withMessage("El nombre de la moneda deber ser un texto")
        .bail()
        .isLength({ min: 3, max: 40 }).withMessage("El nombre debe tener entre 3 y 40 caracteres"),

    // Validar indice gini 
    body("indiceGini")
        .optional()
        .custom((indiceGini) => {
            // Si no se envió, no valida nada
            if (!indiceGini) return true;

            const { valor, anio } = indiceGini;
            // Si se envía uno solo de los campos
            if ((valor !== undefined && anio === undefined) || (valor === undefined && anio !== undefined)) {
                throw new Error("Si se envía indiceGini, debe incluir el valor y año");
            }
            return true;
        }),
    body("indiceGini.valor")
        .optional()
        .trim()
        // Validar que valor sea un número
        .isNumeric().withMessage("El indice de Gini debe ser un valor numérico")
        // Validar que valor sea un número entre 0 y 100
        .custom((valor) => {
            valor = Number(valor);
            if (valor < 0 || valor > 100) {
                throw new Error("El indice de Gini debe debe ser un valor entre 0 y 100");
            }
            return true;
        }),
    // Validar que anio se un año válido
    body("indiceGini.anio")
        .optional()
        .trim()
        .isNumeric("El año deber ser un número entero")
        .bail()
        // Validar que el año de medición del indice de gini este entre 1900 y 2026
        .custom((anio) => {
            anio = Number(anio);
            const anioActual = new Date().getFullYear(); // new Date().getFullYear() -> obtiene el año acual
            if (anio < 1912 || anio > anioActual) {
                throw new Error("El año de medición del cóeficiente de Gini debe ser desde 1912 a 2026");
            }
            return true;
        })
    ];
