const getToken = require("../helpers/jwt/getToken");
const getUserIdByToken = require("../helpers/jwt/getUserByToken");
const Message = require("../models/Message");
const User = require("../models/User");

module.exports = class MessageController {

    static async sendMessage(req,res) {
        //GET MESSAGE CONTENT
        const {content} = req.body;
        console.log(content)
        //GET RECEIVER USER
        const {receiverName} = req.params;
        const receiver = await User.findOne({raw:true,where:{
            userName:receiverName
        },attributes:{
            exclude:['password']
        }})

        
        
        //GET THE MESSAGES OWNER
        const token = getToken(req);
        const userId = await getUserIdByToken(token);

        if(!userId){
            res.status(400).json({message:'você precisa estar logado'})
            return
        }

        const message = {
            content,
            senderId:userId,
            receiverId: receiver.id
        }
        try {
           await Message.create(message)
           res.status(200).json({message:`a mensagem foi enviada de ${userId} para ${receiver.id}`})
           return
        } catch (error) {
            console.log(error.message)
            res.status(404).json({message:error.message})
            return
        }

    }

    static async showMessages(req,res){
        const {receiverName} = req.params;

        const token = getToken(req)

        const userId = await getUserIdByToken(token)
        //check if user is authenticated
        if(userId){

        }
        //get receiverid and senderid

        //!put this code in a function to use trycatch
        //!verificar se eles sao amigos -talvez nao precise
        const receiver = await User.findOne({where:{
            userName:receiverName},
            attributes:['id']})
        
        //get messages
        try {
            const messages = await Message.findAll({where:{
                senderId: userId,
                receiverId:receiver.id
            }})
            res.status(200).json({messages})
        } catch (error) {
            res.status(404).json({message:error.message})
            return
        }


    }

    static async deleteMessage(req,res) {
        const {id} = req.body;
        //check if user is message owner

        const message = await Message.findOne({where:
        id})

        const token = getToken(req);
        const userId = await getUserIdByToken(token)

        if(userId !== message.senderId){
            res.status(404).json({message:'esta mensagem nao foi vc quem escreveu'})
            return
        }

       try {
            await Message.destroy({where:{id}})
            res.status(200).json({message:'mensagem deletada'})
            return
       } catch (error) {
            res.status(404).json({message:error.message})
            return
       }
    }
}