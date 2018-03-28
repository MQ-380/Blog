import mongoose from 'mongoose'

let userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  editTime: String,
  isAdmin: Boolean,
  auth: String,
  loginToken: String,
  loginTime: Date,
  slogan: String,
  links: Object
});

module.exports = mongoose.model('Users', userSchema, 'Users')
