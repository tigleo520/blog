const mongoose = require('mongoose')
const schema = new mongoose.Schema({
  title: { type: String },
  content: { type: String },
  posttime: { type: String },
  category: { type: mongoose.SchemaTypes.ObjectId, ref: 'Category'}
})

module.exports = mongoose.model('Article', schema)
