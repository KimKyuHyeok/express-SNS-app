const userRepository = require('./user.repository');
const {signup, login} = require("./user.repository");
const {encodePass} = require('../config/user.config');
const passport = require('passport');
const sendMail = require('../mail/mail');
const User = require('../model/users.model');


const UserService = {
    signup: async (req, res) => {
        const {email, password, username} = req.body;

        const findUser = await User.findOne({ where: {email: email}});
        if (findUser) {
            req.flash('error', '존재하는 이메일 입니다. 다른 이메일을 사용해주세요.');
            return res.redirect('/auth/signup');
        }

        try {
            const encodePassword = encodePass(password);

            User.create({
                email: email,
                password: encodePassword,
                username: username
            })
            .then((userInfo) => {
                req.flash('success', '회원가입이 완료되었습니다.');
                return res.redirect('/auth/login');
            })
            .catch((err) => {
                console.err('Signup Error : ', err);
                req.flash('error', '회원가입 도중 에러가 발생하였습니다.');
                return res.redirect('/auth/signup');
            })

            // await sendMail('kyuhyeok@gmail.com', 'test', 'welcome');

        } catch (e) {
            console.log(e);
        }

    },

    login: (req, res, next) => {
        passport.authenticate('local', (err, user, info) => {
            if (err) return next(err);
            if (!user.email || !user.password) {
                req.flash('error', '이메일 또는 비밀번호를 입력해주세요.');
                res.redirect('/auth/login');
            }

            req.logIn(user, function (err) {
                if (err) return next(err);
                res.redirect('/posts');
            })
        })(req, res, next)
    },

    logout: (req, res, next) => {
        req.logOut();
        res.redirect('/user/login');
    },
}



module.exports = UserService;