const getToken = require("../helpers/jwt/getToken");
const getUserIdByToken = require("../helpers/jwt/getUserByToken");
const Friend = require("../models/Friend");
const User = require("../models/User");

module.exports = class FriendsController {
    static async sendRequest(req,res) {
        const {id} = req.body;
        //GET USER
        const token = getToken(req);
        const userId = await  getUserIdByToken(token)
        const user = await User.findOne({where:{
            id:userId
        }})
        //check if is not user owner account
        if(id === userId){
            res.status(404).json({message:'você não pode se adicionar'})
            return
        }
        //check if user already friend
        if(user.friends.indexOf(id) != -1){
            res.status(404).json({message:'ocorreu um erro na sua solicitação'})
            return
        }
        
        const friendData={
            status:'pending',
            
        }

        try {
            const invite = await Friend.create(friendData)
            res.status(200).json({message:'solicitação enviada com sucesso'})
            return
        } catch (error) {
            res.status(404).json({message:error.message})
            return
        }


    }
}