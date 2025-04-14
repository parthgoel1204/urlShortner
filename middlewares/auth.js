const {getUser } = require('../service/auth');

async function restrictToLoggedInUser(req,res,next){
  const userUId = req.cookies?.uId;
  console.log("Cookie uId:", userUId);
  if(!userUId){
    return res.redirect('/login');
  }
  const user =  getUser(userUId);
  console.log("Authenticated User", user);
  
  if(!user){
    return res.redirect('/login');
  }
  req.user = user;
  next();
}

async function checkAuth(req,res,next){
  const userUId = req.cookies?.uId;
  
  const user =  getUser(userUId);
 
  req.user = user;
  next();
}

module.exports = {
  restrictToLoggedInUser,
  checkAuth
}