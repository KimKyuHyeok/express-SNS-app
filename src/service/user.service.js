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
        if (findUser) return res.status(400).json({message: '존재하는 이메일 입니다. 다른 이메일을 사용해주세요.'});

        try {
            const encodePassword = encodePass(password);

            User.create({
                email: email,
                password: password,
                username: username
            })
            .then((userInfo) => {
                return res.status(200).json({
                    success: true,
                });
            })
            .catch((err) => {
                return res.status(400).json({
                    success: false,
                })
            })

            await sendMail('kyuhyeok@gmail.com', 'test', 'welcome');


            return res.status(200).json({
                success: true,
            })
        } catch (e) {
            console.log(e);
        }

    },

    login: (req, res, next) => {
        passport.authenticate('local', (err, user, info) => {
            if (err) return next(err);
            console.log("test" , user.email);
            if (!user.email || !user.password) return res.json({ message: '이메일 또는 비밀번호를 입력해주세요.'});

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