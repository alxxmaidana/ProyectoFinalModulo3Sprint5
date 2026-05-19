// Archivo de configuración de express
import express from "express";
import dotenv from "dotenv";
import expressLayouts from "express-ejs-layouts"
import path from "path";
import methodOverride from "method-override"
import router from "./routes/countriesRoutes.js"

dotenv.config()

const app = express();
const port = process.env.PORT || 3000;

// Cofiguración EJS y Layouts
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use(expressLayouts);
app.set("layout", "layout");

// Middlewares
app.use(express.static(path.resolve("./views/public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Parsear formularios con el Método POST
app.use(methodOverride("_method"));

// Redireccionar a /paises que es donde están montadas las rutas
app.get("/", (_req, res) => {
    res.redirect("/paises");
})

// Montar enrutador
app.use("/paises", router)

// Mostrar mensaje cuando no se encuentra una ruta
app.use((_req, res) => {
	res.status(404).send({ mensaje: "Ruta no encontrada" });
});

export { app, port }