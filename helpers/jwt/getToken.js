const jwt = require('jsonwebtoken');


const getToken = (req) => {
    const headerAuth = req.headers.authorization;
    if(!headerAuth){
        return null
    }
    const token = headerAuth.split(' ')[1]
    return token
}

module.exports = getToken