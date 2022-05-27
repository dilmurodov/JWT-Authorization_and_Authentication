
module.exports = class ApiError extends Error{
    constructor(status, message, error){
        super(message);
        this.status = status;
        this.error = error;
        Error.captureStackTrace(this, this.constructor)
    }

    static unAuthorizedUser(){
        return new ApiError(401, "Не Авторизованнный пользователь!")
    }

    static badRequest(message, errors = []){
        return new ApiError(400, message, errors)
    }
}