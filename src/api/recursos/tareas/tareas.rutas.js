const express = require('express')
const routerTareas = express.Router()

const { validadorTareas } = require('./tareas.middlewares')
const { tareasControlador } = require('./tareas.controlador')


routerTareas.get('/', tareasControlador.getTareas)
routerTareas.get('/:idTarea', tareasControlador.getTareas)
routerTareas.post('/', validadorTareas, tareasControlador.postTarea)
routerTareas.put('/:idTarea',validadorTareas, tareasControlador.updateTarea)
routerTareas.delete('/:idTarea',tareasControlador.deleteTarea)


module.exports = routerTareas