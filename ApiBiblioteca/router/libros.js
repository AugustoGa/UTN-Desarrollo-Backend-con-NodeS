const express = require("express");
const router = express.Router();

const Libro = require("../models/Libro");
// Importamos la librería para validar scopes
const { requiredScopes } = require("express-oauth2-jwt-bearer");

//Obtener todos los libros
router.get("/", requiredScopes("read:libros"), async(req, res)=>{
    try{
        const libros = await Libro.find();
        res.json(libros);
    }catch(error){
        res.status(500).json({error:"error al obtener los libros"});
    }
});

//Crear un libro
router.post("/",requiredScopes("write:libros"), async(req, res)=>{
    try{
        const nuevoLibro = new Libro(req.body);
        await nuevoLibro.save();
        res.json(nuevoLibro);
    }catch(error){
        res.status(500).json({error:"error al crear un libro"});
    }
});

//Actualizar libro
router.put("/:id", requiredScopes("write:libros"), async(req, res)=>{
    try{
        const Libro = await Libro.findByIdAndUpdate(req.params.id, req.body,{
            new: true,
        });
    }catch(error){
        res.status(500).json({error:"error al Actualizar libro"});
    }
});

//Eliminar Libro
router.delete("/:id",requiredScopes("write:libros"), async(req, res)=>{
    try{
        await Libro.findByIdAndDetele(req.params.id);
        res.json({message: "Libro Eliminado"});
    }catch(error){
        res.status(500).json({error:"error al Eliminar Libro"});
    }
})


module.exports = router;