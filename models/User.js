const conn = require("../db/conn");
const {DataTypes} = require('sequelize');


const User = conn.define('Users',{
   
    completeName:{
        type:DataTypes.STRING,
        required:true
    },
    email:{
        type:DataTypes.STRING,
        required:true,
        unique:true
    },
    userName:{
        type:DataTypes.STRING,
        required:true,
        unique:true
    },
    password:{
        type:DataTypes.STRING,
        required:true
    },
    friends:{
        type:DataTypes.JSON,
        defaultValue:[], // array de ids
        allowNull:true
    }
   
})




module.exports = User