const {DataTypes} = require('sequelize')
const conn = require('../db/conn')
const User = require('./User')
const Chat = require('./Chat')

const Message = conn.define('Messages',{
    content:{
        type:DataTypes.STRING,
        allowNull:false
    },

})

User.hasMany(Message,{
    as:'sender',
    foreignKey:'senderId'
})
User.hasMany(Message,{
    as:'receiver',
    foreignKey:'receiverId'
})

Message.belongsTo(User,{
    foreignKey:'receiverId'
})


Chat.hasMany(Message)

Message.belongsTo(Chat)

module.exports = Message