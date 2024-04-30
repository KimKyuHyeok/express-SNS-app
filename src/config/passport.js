const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const userRepository = require('../service/user.repository');
const GoogleStrategy = require('passport-google-oauth20');
const KakaoStrategy = require('passport-kakao').Strategy;
const {comparePass} = require('../config/user.config');
const User = require('../model/users.model');
require('dotenv').config();

// req.login(user)
passport.serializeUser((user, done) => {
    console.log("로그인 성공 ID : " + user.id);
    done(null, user.id);
});

// client => session => request
passport.deserializeUser(async (id, done) => {
    const user = await User.findOne({ where: {id: id}});


    if (!user) return done(null, 'not user');

    return done(null, user);
})


const localStrategyConfig = new LocalStrategy({ usernameField: 'email', passwordField: 'password'},
    async (email, password, done) => {
        const user = await User.findOne({ where: { email: email }});

        if (!user) return done(null, false, {msg: '존재하지 않는 이메일 입니다.'});

        const userPassword = user.password;

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
        const userInfo = await User.findOne({ where: { googleId: googleId }});

        if (userInfo) return done(null, userInfo);

        try {
            User.create({
                email: profile.emails[0].value,
                username: profile.displayName,
                firstName: profile.name.givenName,
                lastName: profile.name.familyName,
                googleId: profile.id
            }).then(() => {
                done(null, userInfo);
            }).catch((err) => {
                done(err, userInfo);
            })

        } catch (err) {
            console.log('google login INSERT error');
            return done(err);
        }
    } catch (err) {
        console.error('google login error');
        return done(err);
    }
});

const kakaoStrategyConfig = new KakaoStrategy({
    clientID: process.env.KAKAO_CLIENTID,
    callbackURL: '/auth/kakao/callback',
}, async (accessToken, refreshToken, profile, done) => {
    try {
        const kakaoId = profileInfo.id;

        const userInfo = await User.findOne({ where: { kakaoId: kakaoId }});

        // 프로필 이미지
        const profileImageUrl = profileInfo._json.kakao_account.profile.profile_image_url;

        if (userInfo) return done(null, userInfo);

        // email 정보를 가져오려면 승인이 필요해서 임시로 넣어놨음
        const email = 'test';

        User.create({
            email: profile.emails[0].value,
            username: profile.displayName,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            googleId: profile.id
        }).then(() => {
            done(null, userInfo);
        }).catch((err) => {
            done(err, userInfo);
        })
    } catch (err) {
        console.error('kakao login error');
        return done(err);
    }
});


passport.use("local", localStrategyConfig);
passport.use('google', googleStrategyConfig);
passport.use('kakao', kakaoStrategyConfig);