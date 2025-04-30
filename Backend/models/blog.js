const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  timestamp: { type: Date, default: Date.now },
  imageUrl: { type: String },  //  new field for blog image
  likes: { type: Number, default: 0 },  //  like count
  comments: [{ type: String }]  //  simple comments array
});

module.exports = mongoose.model('Blog', blogSchema);
