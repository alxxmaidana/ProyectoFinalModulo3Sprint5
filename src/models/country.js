import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

//////////////////////////
// Esquema de paises
/////////////////////////
const paisesSchema = new mongoose.Schema({
    nombre: {
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
    },
    bandera: {
        type: String,
        trim: true,
        required: true
    }, // URL PNG
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
    zonasHorarias: [{
        type: String,
        trim: true,
        required: true,
    }],
    monedas: [{
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
            maxLength: 40,
        }
    }],
    indiceGini: { // Algunos paises no tienen dato
        valor: {
            type: Number,
            min: 0,
            max: 100
        },
        anio: {
            type: Number,
        }
    },
    creador: {
        type: String,
        default: process.env.CREATOR
    }
}, {
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