const {  Router } = require('express')
const { verificarToken } = require('../../auth')

const routerRutas = Router()

routerRutas.use('/auth', require('./rutas.autenticacion'))
routerRutas.use('/tareas', require('../tareas/tareas.rutas'))
routerRutas.use('/usuarios', verificarToken, require('../usuarios/usuarios.rutas'))


module.exports = routerRutas