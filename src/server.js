const express = require('express');
const path = require("path");
const app = express();
const sequelize = require('./config/database');
const userRouter = require('./api/routes/users.router');
const mainRouter = require('./api/routes/main.router');
const postsRouter = require('./api/routes/posts.router');
const profileRouter = require('./api/routes/profile.router');
const commentsRouter = require('./api/routes/comments.router');
const friendsRouter = require('./api/routes/friends.router');
const likesRouter = require('./api/routes/likes.router');
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

app.use('/', mainRouter);
app.use('/auth', userRouter);
app.use('/posts', postsRouter);
app.use('/posts/:id/comments', commentsRouter);
app.use('/profile/:id', profileRouter);
app.use('/friends', friendsRouter);
app.use('/posts/:id/like', likesRouter);

app.use(express.static(path.join(__dirname, 'public')));

// Sequelize 연결 확인
sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
    
    // Express 애플리케이션 시작
    const port = process.env.PORT;
    app.listen(port, () => {
        console.log(`Listening on ${port}`);
    });
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

sequelize.sync({ force: false }) // force 옵션은 기존 테이블을 삭제하고 새로 생성합니다. 실제 운영 환경에서는 사용하지 않는 것이 좋습니다.
  .then(() => {
    console.log('Database synchronized successfully.');
  })
  .catch(err => {
    console.error('Unable to synchronize database:', err);
  });

// view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
