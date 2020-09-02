const express = require('express')
const usersRutas = express.Router()
const {
    getUsers,
    getUser,
    postUser,
    updateUser,
    deleteUser,
    getUsersTareas,
    getUserTarea,
    postUserTarea,
    updateUserTarea,
    deleteUserTarea
} = require('./users.controlador')
const { usersValidator, hasheoPassword } = require('./users.middleware')
const { response } = require('../../utils/response')

//Logica de CRUD usuario
usersRutas.get('/',getUsers)
usersRutas.get('/:id', getUser)
usersRutas.post('/',usersValidator, hasheoPassword, postUser)
usersRutas.put('/:id', hasheoPassword, updateUser)
usersRutas.delete('/:id',deleteUser)

//Logica de CRUD interaccion con las tareas
usersRutas.get('/:idUser/tareas',getUsersTareas)
usersRutas.get('/:idUser/tareas/:idTarea', getUserTarea)
usersRutas.post('/:idUser/tareas', postUserTarea)
usersRutas.put('/:idUser/tareas/:idTarea',updateUserTarea)
usersRutas.delete('/:idUser/tareas/:idTarea',deleteUserTarea)
usersRutas.delete('/:idUser/tareas/',(req, res)=>{
})

module.exports = { usersRutas }