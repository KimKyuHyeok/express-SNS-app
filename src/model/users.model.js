const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const {post, like} = require('./posts.model');
const comments = require('./comments.model');


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
    timestamps: false
});

const friends = sequelize.define('friends', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    },
    friendId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
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

User.hasMany(friends, { foreignKey: 'userId' });
User.hasMany(friends, { foreignKey: 'friendId' });
User.hasMany(like, { foreignKey: 'userId' });
User.hasMany(comments, { foreignKey: 'userId' });
post.belongsTo(User, {foreignKey: 'author'});

module.exports = {
    User,
    friends
}
