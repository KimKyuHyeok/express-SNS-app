const bcrypt = require('bcrypt');
require('dotenv').config();

const SALT = bcrypt.genSaltSync(10);

const encodePass = (plainPassword) => {
    return bcrypt.hashSync(plainPassword.toString(), SALT);
}

const comparePass = (plain, encode) => {
    return bcrypt.compareSync(plain.toString(), encode.toString());
}

module.exports = {
    encodePass,
    comparePass
}