const sequelize = require('../config/database');
const like = require('./like.model');
const friends = require('./friends.model');
const { DataTypes } = require('sequelize')


const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
    },
    googleId: {
        type: DataTypes.STRING,
        unique: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    firstName: {
        type: DataTypes.STRING,
        defaultValue: 'First Name'
    },
    lastName: {
        type: DataTypes.STRING,
        defaultValue: 'Last Name'
    },
    bio: {
        type: DataTypes.STRING,
        defaultValue: '데이터 없음'
    },
    hometown: {
        type: DataTypes.STRING,
        defaultValue: '데이터 없음'
    },
    workplace: {
        type: DataTypes.STRING,
        defaultValue: '데이터 없음'
    },
    education: {
        type: DataTypes.STRING,
        defaultValue: '데이터 없음'
    },
    contact: {
        type: DataTypes.STRING,
        defaultValue: '데이터 없음'
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    updateAt: {
        type: DataTypes.DATE
    }
}, {
    tableName: 'users',
    timestamps: false
});




User.hasMany(friends, { foreignKey: 'userId' });
friends.belongsTo(User, {foreignKey: 'userId' });

User.hasMany(friends, { foreignKey: 'friendId' });
friends.belongsTo(User, {foreignKey: 'friendId' });

User.hasMany(friends, { foreignKey: 'friendId', as: 'friendsRequest' });
friends.belongsTo(User, {foreignKey: 'friendId', as: 'friendsRequest' });

User.hasMany(like, { foreignKey: 'userId' });
like.belongsTo(User, { foreignKey: 'userId' });


module.exports = User
