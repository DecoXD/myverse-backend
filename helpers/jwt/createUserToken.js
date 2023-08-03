const jwt = require('jsonwebtoken')

const createUserToken = (user,req) => {
    
    const payload = {
       
        completeName:user.completeName,
        id:user.id
    }

    const secret = 'tstno_dorfinha'

    const token = jwt.sign(payload,secret)
    
    return token
}

module.exports = createUserToken