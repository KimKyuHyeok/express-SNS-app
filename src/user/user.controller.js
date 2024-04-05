const {Router} = require("express");
const { isNotAuth } = require('../middleware/auth');
const UserService = require('./user.service');
const passport = require('passport');

const userRouter = Router();

userRouter.get('/login',isNotAuth, (req, res) => {
    res.render('user/login');
})

userRouter.get('/signup',isNotAuth, (req, res) => {
    res.render('user/signup');
})


userRouter.post('/signup',isNotAuth, UserService.signup);
userRouter.post('/login',isNotAuth, UserService.login);
userRouter.post('/logout', UserService.logout);

module.exports = userRouter;