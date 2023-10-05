const express = require('express');
const checkToken = require('../helpers/jwt/checkToken');
const FriendshipController = require('../controllers/FriendsController');
const router = express.Router();

router.post('/send',checkToken,FriendshipController.sendRequest)


module.exports = router