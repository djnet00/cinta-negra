const mongoose = require('mongoose')
const Schema = mongoose.Schema

const tareasSchema = new Schema({
    titulo:     String,
    contenido:  String,
    usuario:    {type: 'ObjectId', ref: 'usuarios'},
    is_active:  {type: Boolean, default: true}
},
{
    timestamps: true
})

const ModeloTarea = mongoose.model('tareas', tareasSchema)

module.exports = { ModeloTarea }