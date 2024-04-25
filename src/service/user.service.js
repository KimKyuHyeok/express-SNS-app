const userRepository = require('./user.repository');
const db = require('../../db');
const {signup, login} = require("./user.repository");
const {encodePass} = require('../config/user.config');
const passport = require('passport');
const sendMail = require('../mail/mail');
const {User} = require('../model/users.model');


const UserService = {
    signup: async (req, res) => {
        const {email, password, username} = req.body;

        const findUser = await User.findOne({ where: {email: email}});
        if (findUser) return res.status(400).json({message: '존재하는 이메일 입니다. 다른 이메일을 사용해주세요.'});

        try {
            const encodePassword = encodePass(password);

            const user = new User();
            user.email = email;
            user.password = encodePassword;
            user.username = username;
            user.save((err) => {
                if (err) res.status(400, err);

                return res.status(200).json({
                    success: true,
                })
            });

            await sendMail('kyuhyeok@gmail.com', 'test', 'welcome');


            return res.status(200).json({
                success: true,
            })
        } catch (e) {
            console.log(e);
        }

    },

    login: (req, res, next) => {
        passport.authenticate("local", (err, user, info) => {
            if (err) return next(err);
            if (user.email || !user.password) return res.json({ message: '이메일 또는 비밀번호를 입력해주세요.'});
            if (!user) return res.json({ msg: info });

            const userData = user[0][0];

            req.logIn(userData, function (err) {
                if (err) return next(err);
                res.redirect('/');
            })
        })(req, res, next)
    },

    logout: (req, res, next) => {
        req.logOut();
        res.redirect('/user/login');
    },
}



module.exports = UserService;