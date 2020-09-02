const express = require('express')
const { tareasRutas } = require('./api/recursos/tareas/tareas.rutas')
const { usersRutas } = require('./api/recursos/users/users.rutas')
const { initDatabase } = require('./database')

const app = express()
const PORT = 3000

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

initDatabase()

app.use('/tareas', tareasRutas)
app.use('/users', usersRutas)
app.use('/auth', require('./api/recursos/auth'))

module.exports = { app, PORT }