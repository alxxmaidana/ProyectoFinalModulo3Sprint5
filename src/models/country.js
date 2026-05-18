import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

//////////////////////////
// Esquema de paises
/////////////////////////
const paisesSchema = new mongoose.Schema({
    nombre: {
        comun: { type: String, trim: true, required: true, minlength: 3, maxlength: 90, },
        oficial: { type: String, trim: true, required: true, minlength: 3, maxlength: 90, }
    },

    bandera: { type: String, trim: true, }, // URL PNG -> Consumir una API de banderas de países

    capital: { 
        type: [{ type: String, trim: true }],
        validate: {
            validator: (valor) => valor.length >= 1,
            message: "El campo valor es obligatório" 
        }
    }, // En la API de Rest Countries capital suele venir cómo un array.

    subregion: {
        type: String,
        trim: true,
        enum: [ // Verificar que sea algunos de estos valores
            "Sin Subregión",
            "South America",
            "Central America",
            "North America",
            "Caribbean"
        ],
        required: true,
    },

    fronteras: [{ type: String, trim: true, minlength: 3, maxlength: 3 }],

    area: { type: Number, required: true, min: 0, },

    poblacion: { type: Number, required: true, min: 0, },
    
    zonasHorarias: {
       type: [{
            type: String,
            enum: ["UTC-03:00", "UTC-04:00", "UTC-05:00", "UTC-06:00", "UTC-07:00", "UTC-08:00", "UTC-09:00"],
            trim: true,
        }],
        validate: {                             // ← igual que capital
            validator: (valor) => valor.length >= 1,
            message: "Elija al menos una zona horaria"
        }
    },

    moneda: {
        simbolo: { type: String, trim: true, required: true, maxlength: 5 },
        nombre: { type: String, trim: true, required: true, minlength: 3, maxlength: 40, }
    },

    indiceGini: { // Algunos paises no tienen dato
        valor: { type: Number, min: 0, max: 100 },
        anio: { type: Number, min: 1912, max: new Date().getFullYear() } // Recortar el rango del año 1912 - 2026;
    },

    tipoDocumento: { type: String, default: "pais", trim: true, required: true },

    creador: { type: String, default: process.env.CREATOR, trim: true, required: true }
},
    {
        timestamps: true // Agrega y administra automáticamente los campos createAt y updateAt
    });

const Paises = mongoose.model("Paises", paisesSchema, process.env.MONGO_COLLECTION);
export default Paises;
