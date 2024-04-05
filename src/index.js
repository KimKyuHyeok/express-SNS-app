const {Router} = require("express");
const { isAuth } = require('./middleware/auth');

const app = Router();

app.get('/',isAuth, (req, res) => {
    res.render('index');
});

module.exports = app;