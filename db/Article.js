import mongoose from 'mongoose';

let articleSchema = new mongoose.Schema({
  name: 'String',
  tags: [],
  fileName: ''
})

module.exports = mongoose.model('Article',articleSchema,'Article');