const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const userRepository = require('../user/user.repository');
const db = require('../../db');
const GoogleStrategy = require('passport-google-oauth20');
const {comparePass} = require('../config/user.config');
const e = require("express");
require('dotenv').config();

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


const localStrategyConfig = new LocalStrategy({ usernameField: 'email', passwordField: 'password'},
    async (email, password, done) => {
        const user = await db.promise().query(userRepository.findOne, [email], (err, result) => {
            if (err) throw err;
        });

        if (!user) return done(null, false, {msg: '존재하지 않는 이메일 입니다.'});

        const userPassword = user[0][0].password;

        if (!comparePass(password, userPassword)) return done(null, false, {msg: '비밀번호가 일치하지 않습니다.'});

        return done(null, user);
    }
);

const googleStrategyConfig = new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_PASSWORD,
    callbackURL: '/auth/google/callback',
    scope: ['email', 'profile']
}, async (accessToken, refreshToken, profile, done) => {
    try {
        const googleId = profile.id;
        const user = await db.promise().query(userRepository.findByGoogleId, [googleId]);
        const userInfo = user[0][0];

        if (userInfo) return done(null, userInfo);

        const email = profile.emails[0].value;
        try {
            console.log('GOOGLE ID >> ' + googleId);
            console.log('EMAIL >> ' + email);

            await db.promise().query(userRepository.googleSignup, [googleId, email]);

            done(null, userInfo);
        } catch (err) {
            console.log('google login INSERT error');
            return done(err);
        }


    } catch (err) {
        console.error('google login error');
        return done(err);
    }

});


passport.use("local", localStrategyConfig);
passport.use('google', googleStrategyConfig)