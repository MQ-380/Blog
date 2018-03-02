import mongoose from 'mongoose';

let articleSchema = new mongoose.Schema({
  linkName: String,
  tags: [],
  fileName: String
})

module.exports = mongoose.model('Article',articleSchema,'Article');