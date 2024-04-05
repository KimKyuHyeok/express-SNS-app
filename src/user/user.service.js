const userRepository = require('./user.repository');
const db = require('../../db');
const {signup} = require("./user.repository");


const UserService = {
    signup: async (req, res) => {
        const {email, password} = req.body;

        try {
            await db.promise().query(signup, [email, password], (err, result) => {
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

    login: async (req, res) => {

    }
}



module.exports = UserService;