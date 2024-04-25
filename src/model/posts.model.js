const { DataTypes, INTEGER } = require('sequelize');
const sequelize = require('../config/database');

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
        allowNull: false
    },

    image: {
        type: DataTypes.STRING
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false   
    },
    updateAt: {
        type: DataTypes.DATE
    }
}, {
    tableName: 'posts',
    timestamps: true
});

const like = sequelize.define('like', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    createdAt: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    tableName: 'likes',
    timestamps: true
})


module.exports = post;