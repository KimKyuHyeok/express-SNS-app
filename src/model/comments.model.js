const { DataTypes, INTEGER } = require('sequelize');
const sequelize = require('../config/database');

const comments = sequelize.define('comments', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    postId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    createdAt: {
        type: DataTypes.DATE,
        allowNull: false
    },

    updateAt: {
        type: DataTypes.DATE
    }
}, {
    tableName: 'comments',
    timestamps: true
})

module.exports = comments;