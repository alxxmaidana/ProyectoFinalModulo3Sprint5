import mongoose from "mongoose";

const paisesSchema = new mongoose.Schema({
    nombre: {
        comun: { type: String, required: true, trim: true},
        oficial: { type: String, required: true, trim: true }
    },
    independiente: { type: Boolean, required: true },
    miembroOnu: { type: Boolean, required: true },
    capital: { type: String, required: true, trim: true },
    subregion: { type: String, trim: true },
    continente: { type: String, required: true, trim: true },
    sinSalidaMar: { type: Boolean, required: true },
    fronteras: [{ type: String, trim: true }],
    area: { type: Number, min: 0 },
    poblacion: { type: Number, min: 0 },
    fifa: { type: String, uppercase: true, trim: true },
    zonasHoraria: [ String ],
    banderas: {
        png: String,
        svg: String,
        alt: String
    },
    mapas: {
        googleMaps: String,
        openStreetMaps: String
    },
    currencies: { type: Map, of: String },
    languages: { type: Map, of: String },
    latlng: {
        type: [ Number ],
        validate: {
            validator: (value) => value.length === 2,
            message: "lanlng debe contener latitud y longitud"
        }
    },
    creador: { type: String, required: true, trim: true },

});

const Paises = mongoose.model("Pais", paisesSchema, "Grupo-30");
export default Paises;