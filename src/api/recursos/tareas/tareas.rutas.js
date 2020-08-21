const express = require('express')

const tareasRutas = express.Router()

let tareas = []

tareasRutas.get('/', (req, res) => {
    res.status(200).json({response: tareas})
})

tareasRutas.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const tarea = tareas.filter(tarea => tarea.id == id)
    res.status(200).json({response: tarea})
})

tareasRutas.post('/', (req, res) => {
    const tarea = req.body
    tareas.push(tarea)

    res.status(201).json({response: "TAREA CREADA"})
})

tareasRutas.put('/:id', (req, res) => {
    const nombre = req.body.nombre
    const id = parseInt(req.params.id);

    if(tareas.filter(tarea => tarea.id == id).length !== 0) {
        tareas = tareas.filter(tarea => tarea.id !== id)
        
        tareas.push({id: id, nombre: nombre})

        res.status(201).json({res: `TAREA ${id} EDITADA`})
    }else{
        res.status(404).send();
    }
})

tareasRutas.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);

    if(tareas.filter(tarea => tarea.id == id).length !== 0) {
        tareas = tareas.filter(tarea => tarea.id !== id)
        res.status(204).send();
    }else{
        res.status(404).send();
    }
})

module.exports = { tareasRutas } 