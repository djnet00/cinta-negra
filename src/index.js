const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const { initDatabase } = require('./database')

const app = express()

const PORT = process.env.PORT || 3000

app.use( cors() )
app.use( morgan('dev') )
app.use( express.urlencoded( { extended: true} ) )
app.use( express.json() )

initDatabase()

app.use('/', require('./api/recursos/rutas') )



module.exports = { app, PORT }