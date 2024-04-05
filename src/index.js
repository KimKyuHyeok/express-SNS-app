const {Router} = require("express");

const app = Router();

app.get('/', (req, res) => {
    res.render('index');
});

module.exports = app;