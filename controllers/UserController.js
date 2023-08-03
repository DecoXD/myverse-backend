const User = require("../models/User");
const {Op} = require('sequelize')
const bcrypt = require('bcrypt')
module.exports = class UserController {

static isValidEmailAddress(email){
    const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    return regexEmail.test(email)
}


static async register(req,res) {
    const {completeName,userName,email,password,confirmPassword} = req.body;
    
    const user = {
        completeName,
        userName,
        email,
        password,
        confirmPassword}

   //check if all fields are filled

    Object.keys(user).forEach((key) =>{
        if(!user[key]){          
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
        res.status(422).json({message:'ocorreu algum erro, tente novamente mais tarde'})
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

    // create user 
    try {
        const newUser =  await User.create(user)
        res.status(200).json({message:'cadastro realizado com sucesso ',newUser})
        return
    } catch (error) {
       res.status(422).json({message:'ocorreu algum erro, tente novamente'})
       return
    }   
}

}