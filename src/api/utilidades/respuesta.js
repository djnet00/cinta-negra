
const respuesta = {
    error: function(req, res, status, mensaje){
        const statusError = status || 500
        res.status(statusError).json({response: mensaje})
    },
    success: function(req, res, status, mensaje){
        const statusSuccess = status || 200
        res.status(statusSuccess).json({response: mensaje})
    }
}

module.exports = { respuesta }