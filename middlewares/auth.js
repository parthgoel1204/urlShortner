const {getUser } = require('../service/auth');

function checkForAuthentication(req,res,next){
  // const authorizationHeaderValue = req.headers['authorization'];
  // req.user = null;
  // if(!authorizationHeaderValue || 
  //   !authorizationHeaderValue.startsWith('Bearer '))
  //   return next();

  const tokenCookie = req.cookies?.token;
  req.user = null;

  if(!tokenCookie)
    return next();

  const token = tokenCookie;
  // const token = authorizationHeaderValue.split('Bearer ')[1];
  const user = getUser(token);

  req.user = user;
  return next();
}

function restrictTo(roles){
  return function (req,res,next){
    if(!req.user)
      return res.redirect('/login');

    if(!roles.includes(req.user.role))
      return res.end("UnAuthorized")

    return next();
  };
}
// async function restrictToLoggedInUser(req,res,next){
//   // const userUId = req.cookies?.uId;
//   const userUId = req.headers["authorization"];
//   console.log("Cookie uId:", userUId);
//   if(!userUId){
//     return res.redirect('/login');
//   }
//   const token = userUId.split("Bearer ")[1];
//   const user =  getUser(token);
//   console.log("Authenticated User", user);
  
//   if(!user){
//     return res.redirect('/login');
//   }
//   req.user = user;
//   next();
// }

// async function checkAuth(req,res,next){
//   // const userUId = req.cookies?.uId;
//   const userUId = req.headers["authorization"];
//   const token = userUId.split("Bearer ")[1];
//   const user =  getUser(token);
 
//   req.user = user;
//   next();
// }

module.exports = {
  checkForAuthentication,
  restrictTo,
}