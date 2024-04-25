const { Sequelize } = require('sequelize');
require('dotenv').config();

const database = process.env.DB_DATABASE;
const host = process.env.DB_HOST;
const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const port = process.env.DB_PORT || 3306;

const sequelize = new Sequelize(database, user, password, {
    host: host,
    dialect: 'mysql',
    port: port,
    dialectOptions: {
        socketPath: '/tmp/mysql.sock'
      }
});


sequelize.authenticate()
.then(() => {
    console.log('데이터베이스 연결 성공');
})
.catch(err => {
    console.error('데이터베이스 연결 오류 :', err);
});

  

module.exports = sequelize;