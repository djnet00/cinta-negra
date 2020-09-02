const Joi = require('@hapi/joi')
const { respuesta } = require('../../utilidades/respuesta')

const schemaValidadorTareas = Joi.object({
    titulo: Joi.string().min(3).required(),
    autor: Joi.string().min(2).required(),
    contenido: Joi.string().min(5).required()
})

const validadorTareas = (req, res, next)=>{
    const tarea = req.body
    const { error } = schemaValidadorTareas.validate(tarea, { abortEarly: false })
    if(!error){
        next()
    }
    else{
        const errores = error.details.map(error => error.message)
        console.log(errores)
        respuesta.error(req, res, 400, errores)
    }
}
module.exports = { validadorTareas }