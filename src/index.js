const express = require('express')
const { tareasRutas } = require('./api/recursos/tareas/tareas.rutas')

const app = express()
const PORT = 3000

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.use('/tareas', tareasRutas)

module.exports = { app, PORT }