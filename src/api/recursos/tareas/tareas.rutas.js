const express = require('express')
const tareasRutas = express.Router()

const { getTareas, postTarea } = require('./tareas.controlador')

let tareas = []

tareasRutas.get('/', async(req, res) => {
    try {
        const tareas = await getTareas()
        res.status(200).json({response: tareas})
    } catch (error) {
        res.status(400).json({response: 'Error'})
    }
    
})

tareasRutas.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const tarea = tareas.filter(tarea => tarea.id == id)
    res.status(200).json({response: tarea})
})

tareasRutas.post('/', async (req, res) => {
    const tarea = req.body
    
    try {
        const respuesta = await postTarea(tarea)
        res.status(201).json({response: respuesta})
    } catch (error) {
        res.status(400).json({response: 'Error al crear la tarea'})
    }
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