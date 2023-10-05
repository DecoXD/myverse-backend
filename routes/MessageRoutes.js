const MessageController = require("../controllers/MessageController");
const express = require("express");
const checkToken = require("../helpers/jwt/checkToken");

const router = express.Router();


router.get('/:receiverName',checkToken,MessageController.showMessages)
router.post('/:receiverName',checkToken,MessageController.sendMessage)
router.delete('/deleteMessage',checkToken,MessageController.deleteMessage)


module.exports = router