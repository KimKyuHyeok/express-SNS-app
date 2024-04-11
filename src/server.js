const express = require('express');
const path = require("path");
const app = express();
const userRouter = require('./routes/users.router');
const mainRouter = require('./routes/main.router');
const postsRouter = require('./routes/posts.router');
const profileRouter = require('./routes/profile.router');
const commentsRouter = require('./routes/comments.router');
const friendsRouter = require('./routes/friends.router');
const likesRouter = require('./routes/likes.router');

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

app.use('/auth', userRouter);
app.use('/', mainRouter);
app.use('/posts', postsRouter);
app.use('/profile', profileRouter);
app.use('/comments', commentsRouter);
app.use('/friends', friendsRouter);
app.use('/likes', likesRouter);

app.use('/static', express.static(path.join(__dirname, 'public')));



// view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const port = process.env.PORT;

app.listen(port, () => {
    console.log(`Listening on ${port}`);
})