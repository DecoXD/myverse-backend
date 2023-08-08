const express = require('express')
const UserController = require('../controllers/UserController')
const checkToken = require('../helpers/jwt/checkToken')
const router = express.Router()
//get routes
router.get('/:userName',UserController.getUser)
//post routes
router.post('/login',UserController.login)
router.post('/register',UserController.register)
router.post('/checkuser',UserController.checkUser)
//patch routes
router.patch('/accounts/edit/:id',checkToken,UserController.updateUser)
module.exports = router