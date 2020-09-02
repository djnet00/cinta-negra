const express = require('express')
const routerAuth = express.Router()
const { usuariosControlador } = require('../usuarios/usuarios.controlador')
const { validadorUsuarios, hasheoPassword, validadorLogin } = require('../usuarios/usuarios.middlewares')

routerAuth.post('/signup', validadorUsuarios, hasheoPassword, usuariosControlador.signup)
routerAuth.post('/login', validadorLogin, usuariosControlador.login)

module.exports = routerAuth