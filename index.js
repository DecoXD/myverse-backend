const express = require('express')
const app = express()
const port = 5000
const conn = require('./db/conn')


//routes
const authRouter = require('./routes/AuthRoutes')
const postRouter = require('./routes/PostRoutes')
//MODELS
const User = require('./models/User')
const Post = require('./models/Post')

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
app.use('/p',postRouter)
app.use('/',authRouter)

conn.sync().then(() => {
    app.listen(port)
})