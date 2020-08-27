const express = require('express')
const Bcrypt = require("bcryptjs")

const usersRutas = express.Router()

const { getUsers, getUser, postUser, updateUser, deleteUser, getUserTareas, postUserTareas } = require('./users.controlador')
const { response } = require('../../utils/response')
const { usersValidator } = require('./users.middleware')

// INICIO LOGICA CRUD USUARIOS
usersRutas.get('/', async(req, res) => {
    try {
        const users = await getUsers()
        response.success(req, res, 200, users)
    } catch (error) {
        response.success(req, res, 400, {response: 'Error'})
    }
    
})

usersRutas.get('/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const user = await getUser(id)
        res.status(200).json({response: user})
    } catch (error) {
        res.status(400).json({response: 'Error'})
    }
})

usersRutas.post('/', [usersValidator], async (req, res) => {
    req.body.password = Bcrypt.hashSync(req.body.password, 10)
    const user = req.body
    
    try {
        const respuesta = await postUser(user)
        res.status(201).json({response: respuesta})
    } catch (error) {
        res.status(400).json({response: 'Error al crear el usuario'})
    }
})

usersRutas.put('/:id', [usersValidator], async (req, res) => {
    req.body.password = Bcrypt.hashSync(req.body.password, 10)
    const user = req.body
    const id = req.params.id;

    try {
        const respuesta = await updateUser(id, user)
        res.status(201).json({response: respuesta})
    } catch (error) {
        res.status(400).json({response: 'Error al editar el usuario'})
    }
})

usersRutas.delete('/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const respuesta = await deleteUser(id)
        res.status(201).json({response: respuesta})
    } catch (error) {
        res.status(400).json({response: 'Error'})
    }
})
// FIN LOGICA CRUD USUARIOS


// INICIO LOGICA TAREAS USUARIOS
usersRutas.get('/:id/tareas', async (req, res) => {
    const usuario_id = req.params.id

    try {
        const tareas = await getUserTareas(usuario_id)
        response.success(req, res, 200, tareas)
    } catch (error) {
        response.error(req, res, 400, error)
    }
})

usersRutas.get('/:id/tareas/:tarea_id', async (req, res) => {
    const usuario_id = req.params.id
    const tarea_id = req.params.tarea_id
})

usersRutas.post('/:id/tareas', async (req, res) => {
    const usuario_id = req.params.id
    const tarea = req.body

    try {
        const respuesta = await postUserTareas(usuario_id, tarea)
        res.status(201).json({response: respuesta})
    } catch (error) {
        res.status(400).json({response: 'Error al crear tareas del usuario'})
    }
})

usersRutas.put('/:id/tareas/:tarea_id', async (req, res) => {
    const usuario_id = req.params.id
    const tarea_id = req.params.tarea_id;
    const tarea = req.body
})

usersRutas.delete('/:id/tareas/:tarea_id', async (req, res) => {
    const usuario_id = req.params.id
    const tarea_id = req.params.tarea_id
})

usersRutas.delete('/:id/tareas', async (req, res) => {
    const usuario_id = req.params.id
    const tareas = req.body
})
// FIN LOGICA TAREAS USUARIOS

module.exports = { usersRutas } 