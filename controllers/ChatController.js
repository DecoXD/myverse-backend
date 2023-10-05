const getToken = require("../helpers/jwt/getToken");
const getUserIdByToken = require("../helpers/jwt/getUserByToken");
const Chat = require("../models/Chat");

module.exports = class ChatController{
 
    static async findChat(userA,userB){
        let exists = false
        try {
            exists = await Chat.findAll({where:{
                UserAID:userA,
                UserBId:userB
            }})
        } catch (error) {
            console.log(error)
            return null
        }
        return exists
    }

    static async createChat(req,res) {

        const {userBId} = req.body;
        const token = await getToken(req)
        const userAId = await getUserIdByToken(token)
        //verificar se os usuarios sao iguais ou validos
        if((!userAId || !userBId) || userAId == userBId){
            res.status(404).json({message:'ocorreu um erro ao tentar criar o bate-papo'})
            return
        }
        const chatUsers = {
            UserAID:userAId,
            UserBId:userBId
        }

        //check if chat with both users already exists

        const exists = await ChatController.findChat(userAId,userBId)

        if(exists){
            try {
                const chat = await Chat.findOne({raw:true,where:{
                    UserAID:userAId,
                    UserBID:userBId,
                }})
                res.status(200).json({message:'chat existe',chat})
                return
            } catch (error) {
                res.status(401).json({message:'ocorreu algum erro, tente novamente mais tarde'})
                return
            }
        }


        try {
            const newChat = await Chat.create(chatUsers)
            res.status(200).json({message:'bate-papo iniciado com sucesso',newChat})
            return
        } catch (error) {
            res.status(404).json({message:'nao foi possivel iniciar o bate-papo'})
            return
        }


        

    }
    
}