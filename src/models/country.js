import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const paisesSchema = new mongoose.Schema({
    nombre: {
        comun: { type: String, trim: true, required: true, minlength: 3, maxlength: 90, },
        oficial: { type: String, trim: true, required: true, minlength: 3, maxlength: 90, }
    },
    // URL del PNG del país
    bandera: { type: String, trim: true, },
    // La capital o capitales, suelen venir en array en la API
    capital: { 
        type: [{ type: String, trim: true }],
        validate: {
            validator: (capital) => capital.length >= 1,
            message: "El campo capital es obligatório" 
        }
    },
    subregion: {
        type: String,
        trim: true,
        required: true,
    },
    fronteras: [{ type: String, trim: true, minlength: 3, maxlength: 3 }],
    area: { type: Number, required: true, min: 0, },
    poblacion: { type: Number, required: true, min: 0, },
    zonasHorarias: {
       type: [{ type: String, trim: true }],
        validate: {                            
            validator: (valor) => valor.length >= 1,
            message: "Elija al menos una zona horaria"
        }
    },
    moneda: {
        simbolo: { type: String, trim: true, required: true, maxlength: 5 },
        nombre: { type: String, trim: true, required: true, minlength: 3, maxlength: 40, }
    },
    // Algunos paises no tienen dato
    indiceGini: {
        valor: { type: Number, min: 0, max: 100 },
        anio: { type: Number, min: 1912, max: new Date().getFullYear() } // Recortar el rango del año 1912 - 2026;
    },
    // Tipo de documento y creador para filtrar en la colección
    tipoDocumento: { type: String, default: "pais", trim: true, required: true },
    creador: { type: String, default: process.env.CREATOR, trim: true, required: true }
    },
    {
        timestamps: true // Agrega y administra automáticamente los campos createAt y updateAt
    });

const Paises = mongoose.model("Paises", paisesSchema, process.env.MONGO_COLLECTION);
export default  Paises;
