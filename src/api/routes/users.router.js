const {Router} = require("express");
const passport = require('passport');
const {isNotAuth} = require("../middleware/auth");
const UserService = require("../../service/user.service");

const userRouter = Router();

userRouter.get('/login',isNotAuth, (req, res) => {
    res.render('auth/login');
})

userRouter.get('/signup',isNotAuth, (req, res) => {
    res.render('auth/signup');
})

userRouter.post('/signup',isNotAuth, UserService.signup);
userRouter.post('/login', isNotAuth, UserService.login);

userRouter.post('/logout', UserService.logout);

userRouter.get('/google', passport.authenticate('google'));
userRouter.get('/google/callback', passport.authenticate('google', {
    successReturnToOrRedirect: '/',
    failureRedirect: '/user/login',
}))

userRouter.get('/kakao', passport.authenticate('kakao'));
userRouter.get('/kakao/callback', passport.authenticate('kakao', {
    successReturnToOrRedirect: '/',
    failureRedirect: '/user/login',
}))

module.exports = userRouter