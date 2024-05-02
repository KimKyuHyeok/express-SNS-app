const { DataTypes, INTEGER } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./users.model');
const post = require('./posts.model');

const comments = sequelize.define('comments', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    description: {
        type: DataTypes.STRING,
        allowNull: false
    },

    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    postId: {
        type: DataTypes.INTEGER,
        allowNull: false,
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
    tableName: 'comments',
    timestamps: true
})

post.hasMany(comments, {foreignKey: 'postId'}); 
comments.belongsTo(post, {foreignKey: 'postId'});

User.hasMany(comments, {foreignKey: 'userId'});
comments.belongsTo(User, {foreignKey: 'userId'});


module.exports = comments;