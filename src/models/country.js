import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

//////////////////////////
// Esquema de paises
/////////////////////////
const paisesSchema = new mongoose.Schema({
    nombre: {
        comun: { type: String, trim: true, required: true, minLength: 3, maxLength: 90, },
        oficial: { type: String, trim: true, required: true, minLength: 3, maxLength: 90, }
    },
    bandera: { type: String, trim: true, }, // URL PNG -> Consumir una API de banderas de países
    capital: {
        type: [String],
        validate: {
            validator: function (value) {
                return value && value.length > 0;
            },
            message: 'El campo capital no puede quedar vacío'
        },
        trim: true
    }, // En la API de Rest Countries capital suele venir cómo un array.
    subregion: {
        type: String,
        trim: true,
        enum: [ // Verificar que sea algunos de estos valores
            "Sudamérica",
            "América Central",
            "El Caribe (América Insular)",
            "Norteamérica",
            "Sin Subregión",
            "South America",
            "Central America",
            "North America",
            "Caribbean"
        ],
        required: true,
    },
    fronteras: [{ type: String, trim: true, minLength: 3, maxLength: 3, uppercase: true, }],
    area: { type: Number, required: true, min: 0, },
    poblacion: { type: Number, required: true, min: 0, },
    zonasHorarias: {
        type: [String],
        validate: {
            validator: function (value) {
                return value && value.length > 0
            },
            message: "El campo zonasHorarias no puede quedar vacío"
        },
        enum: ["UTC-03:00", "UTC-04:00", "UTC-05:00", "UTC-06:00", "UTC-07:00", "UTC-08:00", "UTC-09:00"],
        trim: true,
        required: true,
    },
    monedas: {
        simbolo: { type: String, trim: true, required: true, maxLength: 5 },
        nombre: { type: String, trim: true, required: true, minLength: 3, maxLength: 40, }
    },
    indiceGini: { // Algunos paises no tienen dato
        valor: { type: Number, min: 0, max: 100 },
        anio: {
            type: Number,
            validate: Number.isInteger,
            message: "anio debe ser un entero"
        }
    },
    tipoDocumento: { type: String, default: "pais", trim: true, requiered: true },
    creador: { type: String, default: process.env.CREATOR, trim: true, required: true }
},
    {
        timestamps: true // Agrega y administra automáticamente los campos createAt y updateAt
    });

const Paises = mongoose.model("Paises", paisesSchema, process.env.MONGO_COLLECTION);
export default Paises;

// Inputs para los formularios
/* 
    Nombres:
        Común (String) -> input type text
        Oficial (String) -> input type text 

    Independiente (Boolean) -> Input type radio si/no

    miembroOnu (Boolean) -> Input type radio si/no

    Capital (String) -> Input type text 

    subregión (String) -> Input type radio (Norte, central, Caribe y sur)

    conSalidaAlMar (Boolean) -> Input type radio si/no

    fronteras (Array de strings) ->input type text, separar por comas

    area (Number) -> input type number

    poblacion (Number) -> Input type number

    idiomas (Array de Strings) -> Input type text

    latLong (Array de Number) -> dos inputs type number

    fifa (String) -> input type text de 3 carácteres
*/

/*
    Puedo agregar la bandera y cuando renderize el formulario consumir la api de bandera de paises y mostrarlas para elegir una como contenido desplegable

 */