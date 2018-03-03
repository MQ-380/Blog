import mongoose from 'mongoose';

let articleSchema = new mongoose.Schema({
  linkName:  { type:String, unique: true },
  tags: [],
  fileName: String,
  articleName: String,
  writer: String,
  createTime: Date,
  editTime: Date,
  comment: [],
  likeNumber: Number,
  readNumber: Number
})

module.exports = mongoose.model('Article',articleSchema,'Article');