import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const paisesSchema = new mongoose.Schema({
    nombre: {
        comun: {
            type: String,
            trim: true,
            required: true,
            minLenght: 3,
            maxLength: 90,
        },
        oficial: {
            type: String,
            trim: true,
            required: true,
            minLenght: 3,
            maxLength: 90,
        }
    },
    // bandera: {
    //     type: String,
    //     trim: true
    // }, // Solo PNG
    independiente: {
        type: Boolean,
        required: true
    },
    miembroOnu: {
        type: Boolean,
        required: true
    },
    capital: {
        type: String,
        trim: true,
        required: true,
        minLenght: 3,
        maxLength: 90,
    },
    subregion: {
        type: String,
        trim: true,
        requiered: true,
    },
    conSalidaAlMar: {
        type: Boolean,
        required: true
    },
    fronteras: [{
        type: String,
        trim: true,
        minLenght: 3,
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
        required: true,
        minLenght: 3,
        maxLength: 3,
        uppercase: true,
    },
    // zonasHorarias: [{
    //     trim: true,
    //     type: String,
    //     required: true,
    // }],
    monedas: [{
        simbolo: {
            type: String,
            trim: true,
            required: true,
            maxLength: 2
        },
        nombre: {
            type: String,
            trim: true,
            required: true,
            minLenght: 3,
            maxLength: 25,
        }
    }],
    idiomas: [{
        acronimo: {
            type: String,
            trim: true,
            required: true,
            minLenght: 3,
            maxLength: 3
        },
        nombre: {
            type: String,
            trim: true,
            required: true,
            minLenght: 3,
            maxLength: 25
        }
    }],
    latLong: {
        type: [ Number ],
        validate: {
            validator: (value) => value.length === 2, // Validar que el array tenga exáctamente 2 elementos (Que representan la latitud y la longitud)
            message: "latLong debe contener latitud y longitud"
        },
        requried: true
    },
    creador: process.env.CREATOR,
});

const Paises = mongoose.model("Pais", paisesSchema, process.env.MONGO_COLLECTION);
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

    segundosIdiomas (Array de Strings) -> Input type text

    latLong (Array de Number) -> dos inputs type number

    fifa (String) -> input type text de 3 carácteres
*/