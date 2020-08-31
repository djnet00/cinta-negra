const Joi = require('@hapi/joi')
const Bcrypt = require('bcryptjs')
const { response } = require('../../utils/response')

const schemaUsersValidator = Joi.object({
    nombre:         Joi.string().min(3).max(30).required(),
    apellido:       Joi.string().min(2).required(),
    password:       Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    access_token:   [Joi.string(),Joi.number()],
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

const hasheoPassword = (req, res, next)=>{
    const usuario = req.body

    if( usuario.password ) {
        const passwordHasheada = Bcrypt.hashSync(usuario.password, 10)
        usuario.password = passwordHasheada
    }
    next()
}

module.exports = { usersValidator, hasheoPassword }

