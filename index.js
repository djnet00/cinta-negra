require('dotenv').config()
const { app, PORT } = require('./src') 

app.listen(PORT, () => {
    console.log(`Bienvenido a http://localhost:${PORT}`)
})