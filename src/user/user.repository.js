const signup = 'INSERT INTO user (email, password) VALUES (?, ?)';
const findOne = 'SELECT * FROM user WHERE email = ?';
const findById = 'SELECT * FROM user WHERE id = ?';

module.exports = {
    signup,
    findOne,
    findById
};