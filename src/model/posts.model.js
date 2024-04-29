const { DataTypes, INTEGER } = require('sequelize');
const sequelize = require('../config/database');
const comments = require('./comments.model');
const { User } = require('./users.model');

const post = sequelize.define('post', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    description: {
        type: DataTypes.STRING,
        allowNull: false
    },

    author: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    image: {
        type: DataTypes.STRING
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    updatedAt: {
        type: DataTypes.DATE
    }
}, {
    tableName: 'posts',
    timestamps: false
});

const like = sequelize.define('like', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    postId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: post,
            key: 'id'
        }
    },

    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'likes',
    timestamps: true
})


post.hasMany(comments, { foreignKey: 'postId' });



module.exports = {post, like};