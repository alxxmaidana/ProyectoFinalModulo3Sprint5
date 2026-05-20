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
        .custom((indiceGini) => {
            // Si no existe el objeto completo, no valida nada
            // if (!indiceGini) return true;
            console.log("Validando índice de Gini:", indiceGini);
            const { valor, anio } = indiceGini;
            // Si se envía uno solo, exigir ambos
            const envioValor = valor !== undefined && valor !== "";
            const envioAnio = anio !== undefined && anio !== "";

            if (envioValor || envioAnio) {
                if (!envioValor || !envioAnio) {
                    throw new Error("Si se envía el índice de Gini, ambos campos (valor y anio) son obligatorios");
                }
            }
            return true;
        }),
    // Valor índice Gini
    body("indiceGini.valor")
        // Si el valor es falsy (null, undefined, "") no se valida, pero si se envía algo que no es falsy se valida
        .optional({ values: "falsy" }) 
        // Es un número flotante entre 0 y 100
        .isFloat({ min: 0, max: 100 })
        .withMessage( "El índice de Gini debe ser un número entre 0 y 100"),

    // Año medición
    body("indiceGini.anio")
        // Si el año es falsy (null, undefined, "") no se valida, pero si se envía algo que no es falsy se valida 
        .optional({ values: "falsy" })
        // Validar que se un número entero entre 1912 y el año actual
        .isInt({min: 1912, max: new Date().getFullYear()})
        .withMessage(
            `El año de medición del índice de Gini debe ser un número entero entre 1912 y ${new Date().getFullYear()}`
        )

];


