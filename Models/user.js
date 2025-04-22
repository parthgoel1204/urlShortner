const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password:{
    type: String,
    required: true,
  },
  role : {
    type : String,
    required : true,
    default : "NORMAL",
  }
}, {timestamps: true})

const User = mongoose.model('user' , userSchema);

module.exports = User;