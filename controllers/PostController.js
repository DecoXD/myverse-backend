const getToken = require("../helpers/jwt/getToken");
const getUserIdByToken = require("../helpers/jwt/getUserByToken");
const Post = require("../models/Post");
const User = require("../models/User");


module.exports = class PostController { 

    static async  getPostsByParam(param,value){
        try {
            const posts = await Post.findAll({raw:true,where:{
                [param]:value
            }})
            return posts
        } catch (error) {
            return error.message
        }
    }

    static async createPost(req,res) {
        //get body data
        const{title,discription} = req.body;
        const imageUrl = req.file.path
        //adcionar ao aws e buscar a url e mandar para o mysql
        if(!title){
            res.status(422).json({message:"o titulo da postagem é obrigatório"})
            return
        }
        if(!req.file){
            res.status(422).json({message:'Por favor, insira uma imagem valida'})
            return
        }

        //find the post owner
        const token = getToken(req)
        const userId = await getUserIdByToken(token)
        console.log(userId)
        let user = undefined

        try {
           user = await User.findOne({where:{id:userId}})
        } catch (error) {
            res.status(401).json({message:'ocorreu algum erro'})
            return
        }
        //testar depois se esse erro é valido pois nao deveria estar aqui se nao estivesse autenticado
        if(!user){
            res.status(422).json({message:'ocorreu algum erro tente novamente mais tarde'})
            return
        }

        const postData = {
            title,
            discription:discription? discription : '',
            image: imageUrl,
            UserId:userId
        }
        
        //send to mysql
        await Post.create(postData)
        res.status(200).json({message:imageUrl})
        return
    }

    static async showPosts(req,res) {
        //pegar id do usuario
        const token = getToken(req)
        const userId = await getUserIdByToken(token)
        //filtrar os posts pertencentes a este usuário      
        try {
            const posts = await Post.findAll({raw:true,where:{UserId:userId}})
           
            //renderizar na tela
        //ACHO MELHOR FAZER NO TRYCATCH AQ MSM
            res.status(200).json({posts})
            return
        } catch (error) {
            res.status(422).json({message:'ocorreu algum erro ao tentar mostrar suas postagens'})
            return
        }
          
    }

    static async updatePost(req,res) {
        const {id} = req.params;
        const{title,discription} = req.body;
        const image = req.file.path;
        
        //find the post
       const [post] = await PostController.getPostsByParam('id',id)
       
       if(!post){
        res.status(204).json({message:'post nao encontrado'})
        return
       }
       const postData = Object.assign({},
        {title:title? title : post.title,
        discription:discription? discription: post.discription,
        image:image? image: post.image})

      
        try {
            console.log('kaposkdas')
            await Post.update(postData,{where:{id}})
            res.status(200).json({message:'post atualizado com sucesso'})
            return
            
        } catch (error) {
            res.status(400).json({message:'erro ao atualizar postagem'})
            console.log(error.message)
            return
        }

    }
}