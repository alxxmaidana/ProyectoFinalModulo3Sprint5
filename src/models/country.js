import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

// Sub-esquema para nombre
const nombreSchema = new mongoose.Schema({
    comun: {
        type: String,
        trim: true,
        required: true,
        minLength: 3,
        maxLength: 90,
    },
    oficial: {
        type: String,
        trim: true,
        required: true,
        minLength: 3,
        maxLength: 90,
    }
});

// Sub-esquema para monedas
const monedasSchema = new mongoose.Schema({
    simbolo: {
        type: String,
        trim: true,
        required: true,
        maxLength: 5
    },
    nombre: {
        type: String,
        trim: true,
        required: true,
        minLength: 3,
        maxLength: 25,
    }
})

// Sub-esquema para latitud y longitud
const latLongSchema = new mongoose.Schema({
    type: [Number],

    validate: {
        validator: (value) => (
            // Validar si es un array de numeros y que sea de dos elementos 
            Array.isArray(value) &&
            value.length === 2 &&
            value.every(num => typeof num === "number")
        ),
        message: "latLong debe contener [latitud, longitud]"
    },
    required: true
});

//////////////////////////
// Esquema de paises
/////////////////////////
const paisesSchema = new mongoose.Schema({
    nombre: nombreSchema,
    bandera: {
        type: String,
        trim: true,
        required: true
    }, // URL PNG
    independiente: {
        type: Boolean,
        required: true
    },
    miembroOnu: {
        type: Boolean,
        required: true
    },
    capital: [{
        type: String,
        trim: true,
        minLength: 3,
        maxLength: 90,
    }], // En la API de Rest Countries capital suele venir cómo un array.
    subregion: {
        type: String,
        trim: true,
        required: true,
    },
    conSalidaAlMar: {
        type: Boolean,
        required: true
    },
    fronteras: [{
        type: String,
        trim: true,
        minLength: 3,
        maxLength: 3,
        uppercase: true
    }],
    area: {
        type: Number,
        required: true,
        min: 0,
    },
    poblacion: {
        type: Number,
        required: true,
        min: 0,
    },
    fifa: {
        type: String,
        trim: true,
        minLength: 3,
        maxLength: 3,
        uppercase: true,
    }, // Algunos paises no tienen código FIFA
    monedas: [monedasSchema],
    latLong: latLongSchema,
    creador: {
        type: String,
        default: process.env.CREATOR
    }
}, {
    timestamps: true // Agrega y administra automáticamente los campos createAt y updateAt
});

const Paises = mongoose.model("Paises", paisesSchema, process.env.MONGO_COLLECTION);
export default Paises;

// Deciri luego si incluyo la bandera o nel

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