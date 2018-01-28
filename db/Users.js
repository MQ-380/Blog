import mongoose from 'mongoose';

let userSchema = new mongoose.Schema({
  username: String,
  time: String,
  editTime: String,
  password: String,
  isAdmin: Boolean,
  loginToken: String,
  loginTime: Date
})

module.exports = mongoose.model('Users',userSchema,'Users');