import mongoose from 'mongoose';

let articleSchema = new mongoose.Schema({
  linkName:  { type:String, unique: true },
  tags: [],
  fileName: String,
  articleName: String,
  writer: String
})

module.exports = mongoose.model('Article',articleSchema,'Article');