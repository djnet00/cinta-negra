const mongoose = require('mongoose')
const Schema = mongoose.Schema

const tareasSchema = new Schema({
    titulo: String,
    autor: String,
    contenido: String,
    usuario: {type: Schema.Types.ObjectId, ref:'usuarios'},
    es_activo: {default: true, type: Boolean},
},{ timestamps: true})

const ModeloTarea = mongoose.model('tareas',tareasSchema)

module.exports = { ModeloTarea }