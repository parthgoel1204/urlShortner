const {v4: uuidv4} = require('uuid');
const User = require('../Models/user');
const {setUser} = require('../service/auth');

async function handleCreateUser(req,res){
  const { firstName, lastName, email, password } = req.body;
  await User.create({
    firstName,
    lastName,
    email,
    password,
  })
  return res.redirect('/'); 
}

async function handleUserLogin(req,res){
  const {email, password} = req.body
  const user = await User.findOne({email , password});
  if(!user){
    return res.render('login' , {
      error: "Invalid email or password",
    })
  }
  // Set session
  const sessionId = uuidv4();
  setUser(sessionId,user);
  res.cookie("uId", sessionId);
  return res.redirect('/');
}

module.exports = {
  handleCreateUser,
  handleUserLogin
}