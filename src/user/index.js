const {Router} = require("express");
const userRouter = require('./user.controller');

const user = Router();

user.use('/user', userRouter);

module.exports = user;