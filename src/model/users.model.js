const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');


// 모델 정의
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
        type: DataTypes.INTEGER
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
    timestamps: true
});

const friends = sequelize.define('friends', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    friendId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'friends',
    timestamps: true
})


module.exports = {
    User,
    friends
}
