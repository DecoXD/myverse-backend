const express = require('express')
const app = express()
const port = 5000
const conn = require('./db/conn')


//routes
const authRouter = require('./routes/AuthRoutes')
const postRouter = require('./routes/PostRoutes')
const messageRouter = require('./routes/MessageRoutes')
const friendshipRouter = require('./routes/FriendshipRouter')
const chatRouter = require('./routes/ChatRoutes')

//MODELS
const User = require('./models/User')
const Post = require('./models/Post')
const Message = require('./models/Message')
const Friend = require('./models/Friend')
const Chat = require('./models/Chat')




//alow body request
app.use(express.urlencoded({
    extends:true
}))
app.use(express.json())
//

//allow static
app.use(express.static('public'))

//colocar no final
//routes
app.use('/f',friendshipRouter)
app.use('/direct',messageRouter)
app.use('/p',postRouter)
app.use('/chat',chatRouter)
app.use('/',authRouter)

conn.sync().then(() => {
    app.listen(port)
})