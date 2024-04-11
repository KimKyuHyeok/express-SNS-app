const {Router} = require("express");
const passport = require('passport');

const userController = require('../user/user.controller');

const userRouter = Router();

userRouter.use(userController);
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