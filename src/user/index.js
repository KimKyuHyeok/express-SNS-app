const {Router} = require("express");
const userRouter = require('./user.controller');

const user = Router();

user.use('/', userRouter);

module.exports = user;