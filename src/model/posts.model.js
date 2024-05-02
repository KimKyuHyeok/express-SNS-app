const { DataTypes, INTEGER } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./users.model');
const like = require('./like.model');

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

post.belongsTo(User, {foreignKey: 'author'});
User.hasMany(post, { foreignKey: 'author' });

post.hasMany(like, { foreignKey: 'postId' });


module.exports = post;