const Joi = require('@hapi/joi')
const Bcrypt = require('bcryptjs')
const { response } = require('../../utils/response')

const schemaUsersValidator = Joi.object({
    nombre:         Joi.string().min(3).max(30).required(),
    apellido:       Joi.string().min(2).required(),
    password:       Joi.string().alphanum().required(),
    access_token:   [Joi.string()],
    email:          Joi.string().email().required()
})

const schemaUsersValidatorLogin = Joi.object({
    password:       Joi.string().alphanum().required(),
    email:          Joi.string().email().required()
})

const usersValidator = (req, res, next) => {
    const tarea = req.body
    const { error } = schemaUsersValidator.validate(tarea, { abortEarly: false })

    if( ! error ) {
        next()
    }else {
        
        const errors = error.details.map( error => error.message )

        return response.error(req, res, 400, errors)
    }
    
}

const hasheoPassword = (req, res, next)=> {
    const usuario = req.body

    if( usuario.password ) {
        const passwordHasheada = Bcrypt.hashSync(usuario.password, 10)
        usuario.password = passwordHasheada
    }
    next()
}

const validateLogin = (req, res, next)=> {
    const credenciales = req.body
    const { error } = schemaUsersValidatorLogin.validate( credenciales, { abortEarly: false } )
    
    if( ! error ) {
        next()
    }else {
        
        const errors = error.details.map( error => error.message )

        return response.error(req, res, 400, errors)
    }
}

module.exports = { usersValidator, hasheoPassword, validateLogin }

