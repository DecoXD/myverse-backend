const express = require('express')
const UserController = require('../controllers/UserController')
const router = express.Router()

//post routes
router.post('/login',UserController.login)
router.post('/register',UserController.register)
//get routes
router.post('/checkuser',UserController.checkUser)

module.exports = router