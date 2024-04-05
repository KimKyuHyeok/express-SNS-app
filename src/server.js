const express = require('express');
const db = require('mysql2');
const path = require("path");
const app = express();
const user = require('./user/index.js');


app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/', user);
app.use('/static', express.static(path.join(__dirname, 'public')));

// view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const port = 4000;



app.listen(port, () => {
    console.log(`Listening on ${port}`);
})