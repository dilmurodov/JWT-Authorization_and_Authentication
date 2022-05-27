const ApiError = require("../exceptions/api-erorr")
const tokenservice = require("../service/token-service")

module.exports = async (req, res, next) => {

    try {
        const header = req.headers.authorization;
        if (!header) {
            return next(ApiError.unAuthorizedUser());
        }
        const accessToken = header.split(' ')[1];

        console.log(accessToken);

        if (!accessToken) {
            return next(ApiError.unAuthorizedUser());
        };

        const UserData = tokenservice.validateAccessToken(accessToken);

        if (!UserData) {
            return next(ApiError.unAuthorizedUser());
        }

        res.user = UserData;

        next();

    } catch (err) {
        next(err);
    }
}