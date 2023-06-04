const db = require('../models/index')
const User = db.users
const jwt = require('jsonwebtoken')

module.exports = {
    verifyToken : async (req, res, next) => {
    try{
    let token = null;
    if (
      typeof req.headers.authorization === 'string' &&
      req.headers.authorization.split(' ').length == 2
    ) {
      token = req.headers.authorization.split(' ')[1];
    }
  
    if (token === null) {
      return res.status(401).send({ message: 'No token provided' });
    }
  
    const userId = await module.exports.innerGetUserIdByToken(token);
  
    if (userId.error !== undefined) {
      let respObject = { message: userId.message, }
      if(userId.code){
        respObject.code = userId.code
      }
      return res.status(userId.error).send(respObject);
    }

    const user = await User.findById(userId);
    if(!user){
        res.status(401).send({ message: 'Unathorized' });
    }
    req.userId = user._id;
    next();
    }catch(e){
        console.log(e)
    }
    },
    innerGetUserIdByToken : async (token) => {
        try {
          const decoded = jwt.verify(token, process.env.SECRET);
          return decoded.id;
        } catch (err) {
          if (err instanceof jwt.TokenExpiredError) {
            return { error: 401, message: 'Token expired', code: 'TOKEN_EXPIRED' };
          } else if (err instanceof jwt.JsonWebTokenError) {
            return { error: 401, message: 'Wrong token' };
          } else {
            return { error: 500, message: 'Server error' };
          }
        }
    }
}
