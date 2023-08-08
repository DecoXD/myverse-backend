const jwt = require('jsonwebtoken')
const getToken = require('./getToken')


const checkToken = async (req,res,next) => {
    
const token = getToken(req)

const secret = 'tstno_dorfinha'
await jwt.verify(token,secret,(err,decodedtoken)=>{
    if(err){
        res.status(422).json({message:'token invalido'})
        return
    }
    else{
        // res.status(200).json({message:'token valido',token})
        next()
    }
})
}

module.exports = checkToken