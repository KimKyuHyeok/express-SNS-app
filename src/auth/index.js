const {Router} = require("express");
const passport = require('passport');

const auth = Router();

auth.get('/google', passport.authenticate('google'));
auth.get('/google/callback', passport.authenticate('google', {
    successReturnToOrRedirect: '/',
    failureRedirect: '/user/login',
}))

module.exports = auth;