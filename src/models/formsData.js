import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

// Esquema de datos para los formularios de los paises (url bandera, zonasHorarias y Subregiones)
const datosFormularioSchema = new mongoose.Schema({
    banderasURL: [{type: String, trim: true }],
    zonasHorarias: [{ type: String, trim: true}],
    subregiones: [{ type: String, trim: true}],
    creador: { type: String, default: process.env.CREATOR, trim: true, required: true },
    tipoDocumento: { type: String, trim: true, default: "data", required: true }
});

const DatosFormulario = mongoose.model("DatosForumario", datosFormularioSchema, process.env.MONGO_COLLECTION);
export default DatosFormulario;