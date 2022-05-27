const UserModel = require("../models/userModel")
const bcrypt = require("bcryptjs")
const uuid = require("uuid")
const mailservice = require("./mail-service")
const tokenservice = require("./token-service")
const tokenDto = require("../dtos/token-dto")
const ApiError = require("../exceptions/api-erorr")
const tokenModel = require("../models/tokenModel")

class UserService {

    async registration (email, password) {
    
        const candidate = await UserModel.findOne({email})
        
        if (candidate){
            throw ApiError.badRequest("This email already registered!");
        }

        const hashPassword = await bcrypt.hash(password, +process.env.SALT);

        const activationLink = uuid.v4();

        const user = await UserModel.create({email, password: hashPassword, activationLink});
        
        const token_dtos = new tokenDto(user);
        const tokens = await tokenservice.generateToken({...token_dtos});


        await tokenservice.saveToken(user._id, tokens.refreshToken);
        await mailservice.sendMail(email, activationLink);

        

        return {...token_dtos, ...tokens};
    }

    async login (email, password) {
        const user = await UserModel.findOne({email});
        
        if (!user){
            throw ApiError.badRequest("User not found!")
        }

        const isEqualPass = await bcrypt.compare(password, user.password)
        
        if (!isEqualPass){
            throw ApiError.badRequest("Invalid password")
        }

        

        const userDto = new tokenDto(user);
        const tokens = await tokenservice.generateToken({...userDto});
        await tokenservice.saveToken(userDto.id, tokens.refreshToken);

        return {...userDto, ...tokens};
    }

    async logout (email, refreshToken) {
        
        const candidate = await UserModel.findOne({email});
        if (!candidate){
            throw ApiError("This user not found!")
        }

        const token = await tokenservice.removeToken(refreshToken);

        return {token};
    }

    async refresh(refreshToken){
        if (!refreshToken){
            throw ApiError.unAuthorizedUser();
        }

        const userData = await tokenservice.validateRefreshToken(refreshToken);
        const tokenFromDB = await tokenservice.findToken(userData.id);

        if (!userData || !tokenFromDB){
            throw ApiError.unAuthorizedUser();
        }

        const user = UserModel.findById(userData.id);
        const userDto = new tokenDto(user);
        const tokens = await tokenservice.generateToken({...userDto});

        return {...tokens, ...userDto};
    }

    async getUsers() {
        const users = UserModel.find();
        return users;
    }
}

module.exports = new UserService();