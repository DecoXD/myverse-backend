const express = require('express')
const app = express()
const port = 5000
const conn = require('./db/conn')
const User = require('./models/User')
const authRouter = require('./routes/AuthRoutes')

//alow body request
app.use(express.urlencoded({
    extends:true
}))
app.use(express.json())
//



//colocar no final
app.use('/',authRouter)

conn.sync().then(() => {
    app.listen(port)
})