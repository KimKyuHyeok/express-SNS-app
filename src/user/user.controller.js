const {Router} = require("express");
const { isNotAuth } = require('../middleware/auth');
const UserService = require('./user.service');

const userController = Router();

userController.get('/login',isNotAuth, (req, res) => {
    res.render('user/login');
})

userController.get('/signup',isNotAuth, (req, res) => {
    res.render('user/signup');
})


userController.post('/signup',isNotAuth, UserService.signup);
userController.post('/login',isNotAuth, UserService.login);
userController.post('/logout', UserService.logout);

module.exports = userController;