const Joi = require('@hapi/joi')
const { response } = require('../../utils/response')

const schemaTareasValidator = Joi.object({
    titulo:     Joi.string().min(3).max(30).required(),
    contenido:  Joi.string().min(5).required()
})

const tareasValidator = (req, res, next) => {
    const tarea = req.body
    const { error } = schemaTareasValidator.validate(tarea, { abortEarly: false })

    if( ! error ) {
        next()
    }else {
        
        const errors = error.details.map( error => error.message )

        return response.error(req, res, 400, errors)
    }
    
}

module.exports = { tareasValidator }

