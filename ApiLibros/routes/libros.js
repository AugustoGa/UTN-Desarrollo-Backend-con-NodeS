const express = require("express");
const router = express.Router();
const libros = require ("../data");
const Joi = require("joi");

const libroSchema = Joi.object({
    titulo: Joi.string().required().label("Titulo"),
    author: Joi.string().required().label("Autor")
});


//Todos los libros
router.get("/", (req , res, next) => {
    try{
        res.json(libros);
    }catch(err){
        next(err);
    }
});


//Libro x ID
router.get("/:id",(req , res, next) => {
    try{
        const id = req.params.id;
        const libro = libro.find((l) => l.id === id);
        if(!libro){
            const error = new Error("libro no encontrado");
            error.status = 404;
            throw error;
        }
    }catch(err){
        next(err);
    }
});


//Crear Libro
router.post("/", (req , res, next) => {
    try{
        const{ error, value } = libroSchema.validate(req.body);
        if(error){
            const validationError = new Error("Error de validacion");
            validationError.status = 400;
            validationError.details = error.details.map(detail => detail.message);
            throw validationError;
        }
        const { titulo, author} = value;

        const nuevoLibro = {
            id: libros.length + 1,
            titulo,
            author
        };
        libros.push(nuevoLibro);
        res.status(201).json(nuevoLibro);
    }catch(err){
        next(err);
    }
})


//Actualizar Libro
router.put("/:id", (req, res ,next)=> {
    try{
        const id = req.params.id;
        const{ error, value} = libroSchema.validate(req.body);
        if (error){
            const validationError = new Error("Error de validacion");
            validationError.status = 400;
            validationError.details = error.details.map(detail => detail.message);
            throw validationError;
        }
        const { titulo, author} = value;
        const libro = libros.find((l) => l.id === id);
        if (!libro){
            const error = new Error("Libro no encontrado");
            error.status = 404;
            throw error;
        }
        libro.titulo = titulo || libro.titulo;
        libro.author = author || libro.author;
        res.json(libro);
    }catch(err){
        next(err);
    }
});


//Eliminar un libro
router.delete("/:id", (req, res , next)=>{
    try{
        const id = req.params.id;
        const index = libros.findIndex((l) => l.id === id);

        if (index === -1){
            const error = new Error("Libro no encontrado");
            error.status = 404;
            throw error;
        }
        const libroEliminado = libros.splice(index, 1);
        res.json(libroEliminado[0]);
    }catch(err){
        next(err);
    }
});


module.exports = router;