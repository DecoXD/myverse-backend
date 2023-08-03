const jwt = require('jsonwebtoken')
const User = require('../../models/User')

const getUserIdByToken = async (token) => {
  const secret = 'tstno_dorfinha'
 if(!token){
    return false
 }
 try {
    const decodedToken = jwt.decode(token,secret);
    const userId = decodedToken.id;
    return userId
 } catch (error) {
   
    return false
 }      

}

module.exports = getUserIdByToken