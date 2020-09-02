const Joi = require('@hapi/joi')
const bcrypt = require('bcryptjs')
const { respuesta } = require('../../utilidades/respuesta')
const schemaValidadorUsuarios = Joi.object({
    nombre: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).alphanum().required()
})
const validadorUsuarios = (req, res, next)=>{
    const usuario = req.body
    const { error } = schemaValidadorUsuarios.validate(usuario, { abortEarly: false })
    if(!error){
        next()
    }
    else{
        const errores = error.details.map(error => error.message)
        console.log(errores)
        respuesta.error(req, res, 400, errores)
    }
}
const hasheoPassword = async (req, res, next)=>{
    const usuario = req.body
    const passwordHasheada = bcrypt.hashSync(usuario.password, 10)
    usuario.password = passwordHasheada
    next()
}

const schemaValidadorLogin = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).alphanum().required()
})
const validadorLogin = (req, res, next)=>{
    const credenciales = req.body
    const { error } = schemaValidadorLogin.validate(credenciales, { abortEarly: false })
    if(!error){
        next()
    }
    else{
        const errores = error.details.map(error => error.message)
        console.log(errores)
        respuesta.error(req, res, 400, errores)
    }
}


module.exports = { validadorUsuarios, hasheoPassword, validadorLogin }