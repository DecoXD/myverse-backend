const express = require('express')
const UserController = require('../controllers/UserController')
const router = express.Router()


//get routes
router.get('/register',UserController.register)

module.exports = router