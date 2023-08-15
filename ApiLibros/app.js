const express = require('express');
const app = express();
app.use(express.json());



const librosRouter = require("./routes/libros");

const errorHandler = require("./middlewares/errorHandler");


app.use("/libros", librosRouter);

app.use(errorHandler);


app.listen(8080, () => {
    console.log("Servidor iniciado, puerto 8080");

})