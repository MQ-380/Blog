import mongoose from 'mongoose';

let userSchema = new mongoose.Schema({
  userName: String,
  time: String
})

module.exports = mongoose.model('Users',userSchema,'Users');