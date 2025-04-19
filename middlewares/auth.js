const {getUser } = require('../service/auth');

async function restrictToLoggedInUser(req,res,next){
  // const userUId = req.cookies?.uId;
  const userUId = req.headers["authorization"];
  console.log("Cookie uId:", userUId);
  if(!userUId){
    return res.redirect('/login');
  }
  const token = userUId.split("Bearer ")[1];
  const user =  getUser(token);
  console.log("Authenticated User", user);
  
  if(!user){
    return res.redirect('/login');
  }
  req.user = user;
  next();
}

async function checkAuth(req,res,next){
  // const userUId = req.cookies?.uId;
  const userUId = req.headers["authorization"];
  const token = userUId.split("Bearer ")[1];
  const user =  getUser(token);
 
  req.user = user;
  next();
}

module.exports = {
  restrictToLoggedInUser,
  checkAuth
}