const {DataTypes} = require('sequelize');
const conn = require('../db/conn');
const User = require('./User');

const Post = conn.define('Posts',{
    title:{
        type:DataTypes.STRING,
        required:true
    },
    image:{
        type: DataTypes.JSON,
        allowNull: false,
        required:true

    },
    discription:{
        type: DataTypes.STRING,
    }

})

Post.belongsTo(User)
User.hasMany(Post)


module.exports = Post