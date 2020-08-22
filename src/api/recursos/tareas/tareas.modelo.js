const mongoose = require('mongoose')
const Schema = mongoose.Schema

const tareasSchema = new Schema({
    titulo:     String,
    autor:      String,
    contenido:  String,
    fecha:      {type: Date, default: Date.now}
})

const ModeloTarea = mongoose.model('tareas', tareasSchema)

module.exports = { ModeloTarea }