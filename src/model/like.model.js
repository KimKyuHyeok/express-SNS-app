const { DataTypes, INTEGER } = require('sequelize');
const sequelize = require('../config/database');

const like = sequelize.define('like', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    postId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
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

module.exports = like;