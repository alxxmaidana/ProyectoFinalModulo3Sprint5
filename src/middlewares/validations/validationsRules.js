import { body } from "express-validator";

// Definir aqúi middleware de verificar resultado de validaciones
export const validacionesPaises = [
    // nombre.comun
    body("nombre.comun")
        .isString().withMessage("El nombre común debe ser un texto") // Es string
        .trim() // Eliminar los espacios el blanco al inicio y final
        .notEmpty().withMessage("El nombre común es obligatorio") // Validar que campo no esté vació
        .isLength({ min: 3 }).withMessage("El nombre común debe tener un mínimo de 3 caractéres") // Que tenga un mínimo de 3 caractéres
        .isLength({ max: 90 }).withMessage("El nombre común no puede superar los 60 caractéres"), // Que tenga un máximo de 90 caractéres
    body("nombre.oficial")
        .isString().withMessage("El nombre oficial debe ser un texto")
        .trim()
        .notEmpty().withMessage("El nombre oficial es obligatorio")
        .isLength({ min: 3 }).withMessage("El nombre oficial debe tener un mínimo de 3 caractéres")
        .isLength({ max: 90 }).withMessage("El nombre oficial no puede superar los 60 caractéres"),
    body("bandera")
        .isURL().withMessage("El campo bandera debe ser una URL válida") // Validar que sea una URL
        .trim(),
    body("capital")
        .isArray({ min: 1 }).withMessage("La capital es obligatoria"), // Validar que se un array
    // Validar cada elemento de capital
    body("capital.*")
        .isString().withMessage("Cada capital debe ser un texto")
        .trim()
        .isLength({ min: 3 }).withMessage("Cada capital debe tener almenos 3 caractéres")
        .isLength({ max: 90 }).withMessage("Cada capital no puede superara los 90 caractéres"),
    body("subregion")
        .trim()
        .isIn([ // Validar que el valor del campo se alguno de los siguientes
            "Sudamérica",
            "América Central",
            "Caribe (América Insular)",
            "Norteamérica"
        ])
        .withMessage("Subregión inválida"),
    // Validar cada campos de fronteras
    body("fronteras.*")
        .isString().withMessage("Cada país debe ser ingresado cómo un texto con 3 letras maýusculas")
        .trim()
        .isLength().withMessage("El código de cada país debe tener exáctamente 3 caractéres")
        .isLength().withMessage("El código de cada país debe tener exáctamente 3 caractéres")
        .isUppercase().withMessage("Ingrese el código de cada país en mayúsculas"),
    body("area")
        .notEmpty().withMessage("El área del país es obligatório")
        .isNumeric().withMessage("El área del país debe ser un número")
        .custom(value => {// Validar que no sea negativo
            if (value < 0) {
                throw new Error("El área del país no puede ser negativo")
            }
            return true;
        }),
    body("poblacion")
        .notEmpty().withMessage("La cantidad de habitantes del país es obligatória")
        .isNumeric().withMessage("La cantidad de habitantes debe ser un número")
        .custom(value => { // Validar que no sea negativo
            if (value < 0) {
                throw new Error("La cantidad de habitantes del país no puede ser negativa")
            }
            return true;
        }),
    body("zonasHorarias")
        .isArray({ min: 1 }).withMessage("Eliga almenos una zona horária"),
    body("zonasHorarias.*")
        .trim()
        .isIn(["UTC-03:00", "UTC-04:00", "UTC-05:00", "UTC-06:00", "UTC-07:00", "UTC-08:00", "UTC-09:00"])
        .withMessage("Zona horária invalida"),
    body("monedas")
        .isArray({ min: 1 }).withMessage("Ingrese almenos una moneda"),
    body("monedas.*.simbolo")
        .isString().withMessage("El símbolo debe ser texto")
        .trim()
        .notEmpty().withMessage("El símbolo es requerido")
        .isLength({ max: 5 }).withMessage("El símbolo no puede superar los 5 caracteres"),
    body("monedas.*.nombre")
        .isString().withMessage("El nombre debe ser texto")
        .trim()
        .notEmpty().withMessage("El nombre es requerido")
        .isLength({ min: 3, max: 40 }).withMessage("El nombre debe tener entre 3 y 40 caracteres"),
    body("indiceGini.valor")
        .isNumeric().withMessage("El indice de gini debe ser un valor numérico")
        .custom(value => {
            if ((value < 0) && (value > 100)) {
                throw new Error("El indice de gini debe ser un valor entre 0 y 100")
            }
        }),
    body("indiceGini.anio")
        .isNumeric().withMessage("El año debe ser un número")
];

// Al momento de probar los enpoints en postman, probar si bail() detiene la validación de cada campo. 