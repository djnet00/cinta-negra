
const mongoose = require('mongoose')
const URL = process.env.URL_MONGODB


const initDatabase = ()=>{
    mongoose.connect(URL,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    )
    const mongo = mongoose.connection
    mongo.on('error', ()=> console.log('Error en la conexion con la DB' ))
    mongo.once('open', ()=> console.log('Conectado a mongo DB 🚀'))
}

module.exports = { initDatabase }

