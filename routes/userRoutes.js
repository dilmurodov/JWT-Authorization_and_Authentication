const express = require("express");
const UserController = require("../controller/userController")
const auth = require("../middleware/auth-middleware");

const {check} = require("express-validator")

const router = new express.Router();

const validation = [
    check('password')
        .exists()
        .withMessage("Password is required!")
        .isLength({min: 5})
        .withMessage("wrong password Length"),
    check('email')
        .exists()
        .withMessage("Email is required!")
        .isEmail()
        .withMessage('Uncorrect Email entered')
]

router.post('/registration', validation,  UserController.registrFn)

router.post('/login', UserController.loginFn)

router.post('/logout', UserController.logoutFn)

router.get('/refresh', UserController.refreshFn)

router.get('/users', auth, UserController.usersFn)

router.get('/activation/:link', UserController.activateFn)

module.exports = router;