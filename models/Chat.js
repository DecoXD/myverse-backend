const {DataTypes} = require('sequelize');
const conn = require('../db/conn');
const Message = require('./Message');
const User = require('./User');

const Chat = conn.define("Chats")

Chat.belongsTo(User,{as:'UserA'})
Chat.belongsTo(User,{as:'UserB'})

module.exports = Chat
