const {  Schema, model } = require('mongoose')
const usuarioSchema = new Schema({
    nombre: String,
    email: String,
    password: String,
    tareas: [{type: Schema.Types.ObjectId, ref: 'tareas'}],
    es_activo: { default: true, type: Boolean }
},{timestamps: true})

const ModeloUsuario = model('usuarios', usuarioSchema)

module.exports = { ModeloUsuario }