const { DataTypes, INTEGER } = require('sequelize');
const sequelize = require('../config/database');
const post = require('./posts.model');
const User = require('./users.model');

const comments = sequelize.define('comments', {
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

    postId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: post,
            key: 'id'
        }
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
    tableName: 'comments',
    timestamps: true
})


module.exports = comments;