import { body } from "express-validator";

export const validacionesPaises = [
    ////////////////////////
    // Validaciones nombres
    ///////////////////////

    // Nombre común
    body("nombre.comun")
        // Eliminar los espacios el blanco al inicio y final
        .trim()
        // Validar que campo no esté vació
        .notEmpty().withMessage("El nombre común del país es obligatorio")
        // bail() -> Detiene la ejecución de la cadena de validaciones si la validación falló
        .bail()
        .isString().withMessage("El nombre común debe ser un texto")
        .bail() 
        // Que tenga un mínimo de 3 caractéres
        .isLength({ min: 3 }).withMessage("El nombre común debe tener un mínimo de 3 caractéres")
        .bail()
        // Que tenga un máximo de 90 caractéres
        .isLength({ max: 90 }).withMessage("El nombre común no puede superar los 60 caractéres"),
    // Nombre oficial
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
        // Que tenga formato de URL
        .isURL().withMessage("El campo bandera debe ser una URL válida"),

    ////////////
    // Capital 
    ////////////
    body("capital.*") // Eliminar espacios en blanco de cada capital
        .trim(),
    body("capital")
        // Que el array capital no esté vacío
        .isArray({ min: 1 }).withMessage("La capital es obligatória")
        .bail()
        // Cáda capital sea un texto  
        .custom((capitales) => {
            // Sin almenos uno no cumple con la validación muestra el mensaje de corrección una sola vez
            if (capitales.some((capital) => typeof capital !== "string")) {
                throw new Error("Cada capital debe ser un texto")
            }
            return true;
        })
        // Cada capitlal tenga alménos 3 caracteres
        .custom((capitales) => {
            if (capitales.some((capital) => capital.length < 3)) {
                throw new Error("Cada capital debe tener almenos 3 caractéres")
            }
            return true;
        })
        .bail()
        // No superen los 90 caracteres
        .custom((capitales) => {
            if (capitales.some((capital) => capital.length > 90)) {
                throw new Error("Cada capital no puede superara los 90 caractéres")
            }
            return true;
        }),
    // Validando de forma con some() evita enviar mensajes de corrección repetidos para cada elemento que no las cumpla


    /////////////////////
    // Subregión
    //////////////////
    body("subregion")
        .trim()
        // Subregión obligatória
        .notEmpty().withMessage("La subregión es obligatoria"),

    ////////////////////////
    // Fronteras
    ////////////////////////
    body("fronteras.*")
    // Eliminar espacios en blanco de cada país de frontereas
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
    // Validar longitud exácta de cada país (3 caracteres)
    body("fronteras")
        .optional()
        .custom(fronteras => {
            if (fronteras.some(pais => pais.length !== 3)) {
                throw new Error("El código de cada país debe tener exactamente 3 caracteres");
            }
            return true;
        }),
    // Validar que esté en mayúsculas
    body("fronteras")
        .optional()
        .custom(fronteras => {
            if (fronteras.some(frontera => frontera !== frontera.toUpperCase())) {
                throw new Error("El código de cada frontera deber ser estar en mayúsculas");
            }
            return true;
        }),

    //////////////////////
    // Área
    /////////////////////
    body("area")
        .trim()
        .notEmpty().withMessage("El área del país es obligatório")
        .bail()
        // Si Es un número
        .isNumeric().withMessage("El área del país debe ser un número")
        .bail()
        //  Que no sea negativo
        .custom(value => {
            if (Number(value) < 0) {
                throw new Error("El área del país no puede ser negativo")
            }
            return true;
        }),

    ////////////////////
    // Población
    ////////////////////
    body("poblacion")
        .trim()
        .notEmpty().withMessage("La cantidad de habitantes del país es obligatória")
        .bail()
        .isNumeric().withMessage("La cantidad de habitantes debe ser un número entero")
        .bail()
        // Que población sea entero
        .isInt().withMessage("La cantidad de habitantes debe ser un número entero")
        .bail()
        // Que no sea negativo
        .custom(value => {
            if (Number(value) < 0) {
                throw new Error("La cantidad de habitantes del país no puede ser negativa")
            }
            return true;
        }),

    ///////////////////////
    // Zonas horárias
    ///////////////////////   
    body("zonasHorarias.*")
        .trim(),
    body("zonasHorarias")
        // Verificar que tenga almenos una zona horaria
        .isArray({ min: 1 }).withMessage("Eliga almenos una zona horária"),
    
    //////////////////////
    // Monedas
    //////////////////////
    body("moneda.simbolo")
        .trim()
        .notEmpty().withMessage("El símbolo de la moneda es requerido")
        .bail()
        // Que sea un string
        .isString().withMessage("El símbolo de la moneda debe ser un texto")
        .bail()
        // Que tenga cómo máximo 5 carácteres
        .isLength({ max: 5 }).withMessage("El símbolo no puede superar los 5 caracteres"),
    body("moneda.nombre")
        .trim()
        .notEmpty().withMessage("El nombre de la moneda es requerido")
        .bail()
        // Que se texto
        .isString().withMessage("El nombre de la moneda deber ser un texto")
        .bail()
        // Que tenga cómo minimo 3 caracteres y máximo 40
        .isLength({ min: 3, max: 40 }).withMessage("El nombre debe tener entre 3 y 40 caracteres"),

    //////////////////////////////
    // Indice de Gini
    ////////////////////////////
    body("indiceGini")
        .optional()
        .custom((indiceGini) => {
            // Si no se envió, no valida nada
            if (!indiceGini) return true;

            const { valor, anio } = indiceGini;
            
            // Valida que se halla enviado ambos campos
            if ((valor !== undefined && anio === undefined) || (valor === undefined && anio !== undefined)) {
                throw new Error("Si se envía indiceGini, debe incluir el valor y año de medición");
            }
            return true;
        }),
    // Indice Gini valor
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
    // Año de medición
    body("indiceGini.anio")
        .optional()
        .trim()
        .isNumeric("El año deber ser un número entero")
        .bail()
        // Validar que sea entero
        .isInt().withMessage(`El año de medición del indice de Gini deber ser un valor entero entre 1912 y ${new Date().getFullYear}`)
        .bail()
        // Validar que el año de medición del indice de gini este entre 1900 y 2026
        .custom((anio) => {
            anio = Number(anio);
            const anioActual = new Date().getFullYear(); // new Date().getFullYear() -> obtiene el año acual
            if (anio < 1912 || anio > anioActual) {
                throw new Error(`El año de medición del cóeficiente de Gini debe ser desde 1912 a ${new Date().getFullYear}`);
            }
            return true;
        })
    ];
