const {Router} = require("express");
const UserService = require('./user.service');

const userRouter = Router();

userRouter.get('/login', (req, res) => {
    res.render('login');
})

userRouter.get('/signup', (req, res) => {
    res.render('signup');
})

userRouter.post('/signup', UserService.signup);

module.exports = userRouter;