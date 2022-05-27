
const ApiError = require("../exceptions/api-erorr")

module.exports = function (err, req, res, next) {
    
    if (err instanceof ApiError){
        
        return res.status(err.status).json({
            "status": err.status,
            "error": err.error,
            "message": err.message
        })
    }
    console.log(err)
    return res.status(500).json({
        "status": err.name,
        "message": `Internal Server Error: ${err.message}`,
        "stack": err.stack,
    })
}

