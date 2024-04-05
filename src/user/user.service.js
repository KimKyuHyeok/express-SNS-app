const userRepository = require('./user.repository');
const db = require('../../db');
const {signup, login} = require("./user.repository");
const {encodePass} = require('../config/user.config');
const passport = require('passport');


const UserService = {
    signup: async (req, res) => {
        const {email, password} = req.body;

        try {
            const encodePassword = encodePass(password);

            await db.promise().query(signup, [email, encodePassword], (err, result) => {
                if (err) throw err;

                return res.status(200).json({
                    success: true,
                })
            });


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
            if (!user) return res.json({ msg: info });

            const userData = user[0][0];

            req.logIn(userData, function (err) {
                if (err) return next(err);
                res.redirect('/');
            })
        })(req, res, next)
    }
}



module.exports = UserService;