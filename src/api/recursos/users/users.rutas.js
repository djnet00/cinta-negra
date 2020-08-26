const express = require('express')
const Bcrypt = require("bcryptjs")

const usersRutas = express.Router()

const { getUsers, getUser, postUser, updateUser, deleteUser } = require('./users.controlador')
const { response } = require('../../utils/response')
const { usersValidator } = require('./users.middleware')

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

module.exports = { usersRutas } 