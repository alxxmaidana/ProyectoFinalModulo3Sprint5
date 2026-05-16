// Archivo de configuración de express
import express from "express";
import dotenv from "dotenv";
dotenv.config()
import expressLayouts from "express-ejs-layouts"
import path from "path";

import router from "./routes/countriesRoutes.js"

const app = express();
const port = process.env.PORT || 3000;

// Parsear json del body a objetos JS
app.use(express.json())

// EJS cómo el motor de vistas
app.set("view engine", "ejs");
// Definir el  Directorio para las vistas
app.set("views", path.resolve("./ejs-layouts/views"));

// Activar expressLayouts
app.use(expressLayouts);
// Definir archivo base para los layouts
app.set("layout", "layout");

// Servir los archivos estáticos
app.use(express.static(path.resolve("./ejs-layouts/public")))

// Montar enrutador
app.use("/", router)

export { app, port }