const conn = require("../db/conn");
const {DataTypes} = require('sequelize')

const User = conn.define('Users',{
    email:{
        type:DataTypes.STRING,
        required:true
    },
    completeName:{
        type:DataTypes.STRING,
        required:true
    },
    userName:{
        type:DataTypes.STRING,
        required:true
    },
    password:{
        type:DataTypes.STRING,
        required:true
    }
   
})


module.exports = User