const mongoose = require('mongoose')

const URL = process.env.URL_MONGODB

const initDatabase = () => {
    mongoose.connect(URL, {
        useNewUrlParser: true, 
        useUnifiedTopology: true
    })

    const mongo = mongoose.connection

    mongo.on('error', () => console.log('Error en la conexión con MongoDB 🚫'))
    mongo.once('open', () => console.log('Conectado a MongoDB ✅'))
}

module.exports = { initDatabase }
