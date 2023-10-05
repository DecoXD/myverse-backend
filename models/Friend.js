const {DataTypes} = require('sequelize');
const conn = require('../db/conn');
const User = require('./User');

const Friend = conn.define('Friends',{
    status:{
        type:DataTypes.STRING      
    }
})

User.belongsToMany(Friend,{
    through:'friendships'
})


Friend.belongsToMany(User,{
    through:'friendships',
    uniqueKey:false
})


module.exports = Friend