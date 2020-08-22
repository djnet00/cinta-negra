const express = require('express')
const tareasRutas = express.Router()

const { getTareas, getTarea, postTarea, updateTarea, deleteTarea } = require('./tareas.controlador')

let tareas = []

tareasRutas.get('/', async(req, res) => {
    try {
        const tareas = await getTareas()
        res.status(200).json({response: tareas})
    } catch (error) {
        res.status(400).json({response: 'Error'})
    }
    
})

tareasRutas.get('/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const tarea = await getTarea(id)
        res.status(200).json({response: tarea})
    } catch (error) {
        res.status(400).json({response: 'Error'})
    }
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

tareasRutas.put('/:id', async (req, res) => {
    const tarea = req.body
    const id = req.params.id;

    try {
        const respuesta = await updateTarea(id, tarea)
        res.status(201).json({response: respuesta})
    } catch (error) {
        res.status(400).json({response: 'Error al editar la tarea'})
    }
})

tareasRutas.delete('/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const respuesta = await deleteTarea(id)
        res.status(204).json({response: respuesta})
    } catch (error) {
        res.status(400).json({response: 'Error'})
    }
})

module.exports = { tareasRutas } 