import { body } from "express-validator";

// Definir aqúi middleware de verificar resultado de validaciones
export const validacionesPaises = [
    // Validar nombre.comun
    body("nombre.comun")
        .trim() // Eliminar los espacios el blanco al inicio y final
        // .notEmpty().withMessage("El nombre común es obligatorio") // Validar que campo no esté vació
        // .bail()
        .custom(value => { // Validar que se un texto
            if (!isNaN(value)) {
                throw new Error("El nombre común debe ser un texto");
            }
            return true;
        })
        .bail() // bail() -> Detiene la ejecución de la cadena de validaciones si la validación falló
        .isLength({ min: 3 }).withMessage("El nombre común debe tener un mínimo de 3 caractéres") // Que tenga un mínimo de 3 caractéres
        .bail()
        .isLength({ max: 90 }).withMessage("El nombre común no puede superar los 60 caractéres"), // Que tenga un máximo de 90 caractéres
    // Validar nombre.oficial
    body("nombre.oficial")
        .trim()
        .notEmpty().withMessage("El nombre oficial es obligatorio")
        .bail()
        .custom(value => { // Validar que se un texto
            if (!isNaN(value)) {
                throw new Error("El nombre oficial debe ser un texto");
            }
            return true;
        })
        .bail()
        .isLength({ min: 3 }).withMessage("El nombre oficial debe tener un mínimo de 3 caractéres")
        .bail()
        .isLength({ max: 90 }).withMessage("El nombre oficial no puede superar los 90 caractéres"),
    // Validar URL de la bandera
    body("bandera")
        .optional()
        .trim()
        .isURL().withMessage("El campo bandera debe ser una URL válida") // Validar que sea una URL
        // .normalizeUrl(),
        ,
    // Validar el array capital
    body("capital")
        .isArray({ min: 1 }).withMessage("La capital es obligatoria"), // Validar que se un array
    // Validar cada elemento del array capital
    body("capital.*")
        .trim()
        .custom(value => { // Validar que se un texto
            if (!isNaN(value)) {
                throw new Error("Cada capital debe ser un texto");
            }
            return true;
        })
        .bail()
        .isLength({ min: 3 }).withMessage("Cada capital debe tener almenos 3 caractéres")
        .bail()
        .isLength({ max: 90 }).withMessage("Cada capital no puede superara los 90 caractéres"),
    // Validar subregión
    body("subregion")
        .trim()
        .notEmpty().withMessage("La subregión es obligatoria")
        .bail()
        .isIn([ // Validar que el valor del campo se alguno de los siguientes
            "Sudamérica",
            "América Central",
            "Caribe (América Insular)",
            "Norteamérica",
            "Sin Subregión"
        ]).withMessage("Subregión inválida"),
    // Validar cada campos del array fronteras
    body("fronteras.*")
        .trim(),
    body("fronteras")
    .optional()
    // Validar que sea un array
    .isArray()
    .withMessage("El campo fronteras debe ser un array")
    .bail()
    .custom(fronteras => {
        // Validar que todos sean strings
        if (fronteras.some(pais => !isNaN(pais))) {
            throw new Error(
                "Cada país debe ser ingresado como un texto"
            );
        }
        // Validar longitud exacta
        if (fronteras.some(pais => pais.length !== 3)) {
            throw new Error(
                "El código de cada país debe tener exactamente 3 caracteres"
            );
        }
        // Validar mayúsculas
        if (fronteras.some(pais => pais !== pais.toUpperCase())) {
            throw new Error(
                "Ingrese el código de cada país en mayúsculas"
            );
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
    // Verificar que tenga almenos una zona horaria
    body("zonasHorarias")
        .isArray({ min: 1 }).withMessage("Eliga almenos una zona horária"),
    // Validar cada zona horaria 
    body("zonasHorarias.*")
        .trim()
        .isIn(["UTC-03:00", "UTC-04:00", "UTC-05:00", "UTC-06:00", "UTC-07:00", "UTC-08:00", "UTC-09:00"])
        .withMessage("Zona horária invalida"),
    body("monedas")
        .isArray({ min: 1 }).withMessage("Ingrese almenos una moneda"),
    body("monedas.*.simbolo")
        .isString().withMessage("El símbolo debe ser texto")
        .bail()
        .trim()
        .notEmpty().withMessage("El símbolo es requerido")
        .bail()
        .isLength({ max: 5 }).withMessage("El símbolo no puede superar los 5 caracteres"),
    body("monedas.*.nombre")
        .custom(value => { // Validar que se un texto
            if (!isNaN(value)) {
                throw new Error("El nombre de la moneda debe ser un texto");
            }
            return true;
        })
        .bail()
        .trim()
        .notEmpty().withMessage("El nombre es requerido")
        .bail()
        .isLength({ min: 3, max: 40 }).withMessage("El nombre debe tener entre 3 y 40 caracteres"),
    body("indiceGini.valor")
        .trim()
        .isNumeric().withMessage("El indice de gini debe ser un valor numérico")
        .bail()
        .custom(value => {
            if (Number(value < 0) && Number(value > 100)) {
                throw new Error("El indice de gini debe ser un valor entre 0 y 100")
            }
            return true; 
        }),
    body("indiceGini.anio")
        .trim()
        .isNumeric().withMessage("El año debe de medición del indice de gini debe ser un número")
        .bail()
        .custom(value => {
            if (Number(value) < 1) {
                throw new Error("El año de medición del indice de gini no puede ser negativo")
            }
            return true;
        })
];
