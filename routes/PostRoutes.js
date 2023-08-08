const express = require('express');
const PostController = require('../controllers/PostController');
const checkToken = require('../helpers/jwt/checkToken');
const imagesUpload = require('../helpers/multer/imagesUpload');
const router = express.Router()

//get routes
router.get('/',PostController.showPosts) //nao esquecer de checkar o token

//POST ROUTES
router.post('/create',imagesUpload.single('image'),PostController.createPost) //nao esquecer de checkar o token

//patch routes
router.patch('/:id',checkToken,imagesUpload.single('image'),PostController.updatePost) //nao esquecer de checkar o token

module.exports = router