const jwt = require("jsonwebtoken");
const tokenModel = require("../models/tokenModel")

class TokenService {
    async generateToken(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "10s" })
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH, { expiresIn: "30d" })
        return {
            accessToken,
            refreshToken
        }
    }

    async saveToken(userId, refToken) {

        const tokenData = await tokenModel.findOne({ user: userId });

        if (tokenData) {
            console.log("Keldi!")
            tokenData.refreshToken = refToken;
            return tokenData.save();
        }

        return await tokenModel.create({
            user: userId,
            refreshToken: refToken
        })
    }

    async removeToken(refreshToken) {

        const token = await tokenModel.deleteOne({ refreshToken });
        return token;

    }

    validateRefreshToken(token) {

        try {
            const userData = jwt.verify(token, process.env.JWT_REFRESH);
            return userData;
        } catch (err) {
            return null;
        }
    }

    validateAccessToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_SECRET);
            return userData;
        } catch (err) {
            return null;
        }
    }

    async findToken(id) {
        const token = tokenModel.findOne({ user: id })
        return token;
    }
}

module.exports = new TokenService();