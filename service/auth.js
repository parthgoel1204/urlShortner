const jwt = require('jsonwebtoken');
const secret = "Parth@0812 "
// State
// const sessionIdToUser = new Map();

// function setUser(id,user){
//   sessionIdToUser.set(id, user);
// }
function setUser(user){
  return jwt.sign({
    _id: user._id,
    email: user.email,
  }, secret)
}
// function getUser(id){
//   return sessionIdToUser.get(id);
// }
function getUser(token){
  if(!token) return null;
  try{
    return jwt.verify(token,secret)
  }
  catch(err){
    return null;
  }
}

module.exports = {
  setUser,
  getUser,  
}