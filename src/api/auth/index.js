const jwt = require('jsonwebtoken')
const { respuesta } = require('../utilidades/respuesta')

const verificarToken = (req, res, next) => {
    try {
        const { authorization } = req.headers
        const token = authorization.split(' ')[1]
        
        const decoded = jwt.verify(token, process.env.SECRET_JWT)
        req.decoded = decoded
        
        next()
    } catch (error) {
        respuesta.error(req, res, 400, 'No estás autorizado.')
    }
}

module.exports = { verificarToken }