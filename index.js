const { app, PORT } = require('./src') 
const express = require('express')

app.listen(PORT, () => {
    console.log(`Bienvenido a http://localhost:${PORT}`)
})