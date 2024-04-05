const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const userRepository = require('../user/user.repository');
const db = require('../../db');
const {comparePass} = require('../config/user.config');

// req.login(user)
passport.serializeUser((user, done) => {
    console.log("로그인 성공 ID : " + user.id);
    done(null, user.id);
});

// client => session => request
passport.deserializeUser(async (id, done) => {
    const user = await db.promise().query(userRepository.findById, [id]);

    if (!user) return done(null, 'not user');

    return done(null, user);
})


passport.use("local", new LocalStrategy({ usernameField: 'email', passwordField: 'password'},
    async (email, password, done) => {
        const user = await db.promise().query(userRepository.findOne, [email], (err, result) => {
            if (err) throw err;
        });

        if (!user) return done(null, false, {msg: '존재하지 않는 이메일 입니다.'});

        const userPassword = user[0][0].password;

        if (!comparePass(password, userPassword)) return done(null, false, {msg: '비밀번호가 일치하지 않습니다.'});

        return done(null, user);
    }
    ));