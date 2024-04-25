const { Sequelize } = require('sequelize');
require('dotenv').config();

const database = process.env.DB_DATABASE;
const host = process.env.DB_HOST;
const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;

const sequelize = new Sequelize(database, user, password, {
    host: host,
    dialect: 'mysql',
});

sequelize.authenticate()
.then(() => {
console.log('Connection has been established successfully.');
})
.catch(err => {
console.error('Unable to connect to the database:', err);
});

  

module.exports = sequelize;