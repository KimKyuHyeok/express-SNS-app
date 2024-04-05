const signup = 'INSERT INTO user (email, password) VALUES (?, ?)';
const findOne = 'SELECT * FROM user WHERE email = ?';
const findById = 'SELECT * FROM user WHERE id = ?';

const findByGoogleId = 'SELECT * FROM user WHERE google_id = ?';
const googleSignup = 'INSERT INTO user (google_id, email) VALUES (?, ?)'

module.exports = {
    signup,
    findOne,
    findById,
    findByGoogleId,
    googleSignup
};