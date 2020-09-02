const express = require('express')
const routerUsuarios = express.Router()
const { usuariosControlador } = require('./usuarios.controlador')
const { validadorUsuarios, hasheoPassword } = require('./usuarios.middlewares')
const { validadorTareas } = require('../tareas/tareas.middlewares')
//Logica de CRUD usuario
routerUsuarios.get('/',usuariosControlador.getUsuarios)
routerUsuarios.get('/:id', usuariosControlador.getUsuario)
routerUsuarios.post('/',validadorUsuarios, hasheoPassword, usuariosControlador.postUsuario)
routerUsuarios.put('/:id', usuariosControlador.updateUsuario)
routerUsuarios.delete('/:id',usuariosControlador.deleteUsuario)

//Logica de CRUD interaccion con las tareas
routerUsuarios.get('/:idUsuario/tareas',usuariosControlador.getUsuariosTareas)
routerUsuarios.get('/:idUsuario/tareas/:idTarea', usuariosControlador.getUsuarioTarea)
routerUsuarios.post('/:idUsuario/tareas',validadorTareas, usuariosControlador.postUsuarioTarea)
routerUsuarios.put('/:idUsuario/tareas/:idTarea',usuariosControlador.updateUsuarioTarea)
routerUsuarios.delete('/:idUsuario/tareas/:idTarea',usuariosControlador.deleteUsuarioTarea)
module.exports =  routerUsuarios