const express = require('express');
const path = require("path");
const app = express();
const user = require('./user/index.js');
const home = require('./index');
const passport = require('passport');
const cookieSession = require('cookie-session');
const cookieEncryptionKey = 'superSecret-key';

app.use(cookieSession({
    keys :[cookieEncryptionKey],
}));


app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(passport.initialize());
app.use(passport.session());
require('./config/passport');

app.use('/user', user);
app.use('/', home);
app.use('/static', express.static(path.join(__dirname, 'public')));

// view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const port = 4000;



app.listen(port, () => {
    console.log(`Listening on ${port}`);
})