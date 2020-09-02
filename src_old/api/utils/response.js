const response = {
    error: (req,res,status,message) => {
        const statusError = status || 500
        res.status(statusError).json({response: message})
    },
    success: (req,res,status,message) => {
        const statusSuccess = status || 200
        res.status(statusSuccess).json({response: message})
    }
}

module.exports = { response }