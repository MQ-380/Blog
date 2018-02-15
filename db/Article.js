import mongoose from 'mongoose';

let articleSchema = new mongoose.Schema({
  catalogName : String,
  catalogChildren: [],
  articles : []
})

module.exports = mongoose.model('Article',articleSchema,'Article');