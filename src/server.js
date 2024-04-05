const express = require('express');
const path = require("path");
const app = express();
const user = require('./user/index.js');
const home = require('./index');
const auth = require('./auth/index');
const passport = require('passport');
const cookieSession = require('cookie-session');

require('./config/passport');
require('dotenv').config();

app.use(cookieSession({
    name :'cookie-session-name',
    keys :[process.env.COOKIEENCRYPTIONKEY],
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/user', user);
app.use('/', home);
app.use('/auth', auth);
app.use('/static', express.static(path.join(__dirname, 'public')));



// view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const port = process.env.PORT;

app.listen(port, () => {
    console.log(`Listening on ${port}`);
})