const Joi = require('@hapi/joi')
const { response } = require('../../utils/response')

const schemaUsersValidator = Joi.object({
    nombre:         Joi.string().min(3).max(30).required(),
    apellido:       Joi.string().min(2).required(),
    password:       Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    access_token:   [Joi.string(),Joi.number()],
    email:          Joi.string().email().min(5).required()
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

module.exports = { usersValidator }

