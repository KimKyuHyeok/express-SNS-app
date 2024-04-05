const {Router} = require("express");
const UserService = require('./user.service');

const userRouter = Router();

userRouter.get('/login', (req, res) => {
    res.render('user/login');
})

userRouter.get('/signup', (req, res) => {
    res.render('user/signup');
})


userRouter.post('/signup', UserService.signup);
userRouter.post('/login', UserService.login);

module.exports = userRouter;