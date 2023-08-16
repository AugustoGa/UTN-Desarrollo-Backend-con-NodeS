const express = require("express");
const app = express();
app.use(express.json());
const {auth} =  require("express-oauth2-jwt-bearer");
// Configuracion Middleware con el Servidor de Autorización
const autenticacion = auth({
    audience: "http://localhost:3000/api/productos",
    issuerBaseURL: "https://dev-utn-frc-iaew.auth0.com/",
    tokenSigningAlg: "RS256",
    });
    
const librosRouter = require("./router/libros");
const errorHandler = require('./middlewares/errorHandler');

app.use("./libros",autenticacion, librosRouter);
app.use(errorHandler);

app.listen(3000,() =>{
    console.log("servidor escuchando en el puerto 3000");
})