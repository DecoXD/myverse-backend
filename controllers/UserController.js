const User = require("../models/User");
const {Op} = require('sequelize')
const bcrypt = require('bcrypt');
const createUserToken = require("../helpers/jwt/createUserToken");
const getToken = require("../helpers/jwt/getToken");
const getUserIdByToken = require("../helpers/jwt/getUserByToken");
module.exports = class UserController {

    static isValidEmailAddress(email){
        const regexEmail = /^[a-zA-Z0-9._%+-]+@+(outlook|gmail)+\.com/
    
        return regexEmail.test(email)
    }

    static async findUserByParam (value,param){
        console.log(param,value)
        try {
            const user = await User.findOne({raw:true,where:{
                [param]:value
            }})
            if(!user){
                throw new Error('usuário nao existe')
            }
            return user
        } catch (error) {
            return false
        }

    }

    

    static async register(req,res) {
        const {completeName,userName,email,password,confirmPassword} = req.body;
        
        const user = {
            completeName,
            userName,
            email,
            password,
            confirmPassword,
            
            }

    //check if all fields are filled

        Object.keys(user).forEach((key) =>{
            if(user[key] == undefined){          
                res.status(422).json({message:`por favor, preencha todos os campos`})
                return
            }
        })
        delete user.confirmPassword

        //check if email is valid
        const validEmail = UserController.isValidEmailAddress(email)

        if(!validEmail){
            res.status(422).json({message:'email inválido'})
            return
        }

        //check if email or userName exists   
        try {
            const userExists = await User.findOne({raw:true,where:{
                [Op.or]:[
                    {email:email},
                    {userName:userName}
                    ]
            }})
           
            
            if(userExists){
                res.status(422).json({message:'Verifique seu email ou nome de usuário e tente novamente '})
                return
            }
        
        } catch (error) {
            res.status(422).json({message:error.message})
            return
        }
        
        //confirmation of password
        if(password!=confirmPassword){
            res.status(422).json({message:'senhas não conferem'})
            return
        }

        //criptografy password
        const salt = bcrypt.genSaltSync(12)
        const hashPassword = bcrypt.hashSync(password,salt)
        user.password = hashPassword

        // create token and user
        try {
            const newUser =  await User.create(user)
            const token = createUserToken(newUser,req)
            res.status(200).json({message:'cadastro realizado com sucesso ',newUser,token})
            return
        } catch (error) {
        res.status(422).json({message:'ocorreu algum erro, tente novamente'})
        return
        }   
    }

    static async login (req,res) {
        const {email,password} = req.body;
        
        const user = await UserController.findUserByParam(email,'email')
        // check if email exists
        
        if(!user){
            res.status(422).json({message:'dados incorretos'})
            return
        }
        
        //check if password matches

        const isPasswordMatch = bcrypt.compareSync(password,user.password)

        if(!isPasswordMatch){
            res.status(422).json({message:'dados incorretos'})
            return
        }

        //create Token
        const token =  createUserToken(user,req)       
        res.status(200).json({message:'você está autenticado', token})
        return
     
    }

    static async checkUser(req,res) {        
        const token = getToken(req)
        const userId = await getUserIdByToken(token)
        const user = await UserController.findUserByParam(userId,'id')
       
        if(!user){
            res.status(401).json({message:'acesso negado token invalido'})
            return
        }
        res.status(200).json({message:'você está autenticado',user})
        
    }
    
    static async getUser(req,res) {
        const {userName} = req.params;
        const user = await UserController.findUserByParam(userName,'userName')
        if(!user){
            res.status(422).json({message:'usuário nao encontrado'})
            return
        }
        res.status(200).json({message:'usuário encontrado',user})
    }

    static async updateUser(req,res) {

    }

}