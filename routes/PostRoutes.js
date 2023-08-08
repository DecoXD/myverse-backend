const express = require('express');
const PostController = require('../controllers/PostController');
const checkToken = require('../helpers/jwt/checkToken');
const imagesUpload = require('../helpers/multer/imagesUpload');
const router = express.Router()

//GET routes
router.get('/',PostController.showPosts) //nao esquecer de checkar o token

//POST ROUTES
router.post('/create',imagesUpload.single('image'),PostController.createPost) //nao esquecer de checkar o token

//PATCH routes
router.patch('/:id',checkToken,imagesUpload.single('image'),PostController.updatePost) //nao esquecer de checkar o token

//DELETE routes
router.delete('/del/:id',checkToken,PostController.deletePost)
module.exports = router