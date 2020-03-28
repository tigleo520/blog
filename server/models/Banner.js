const mongoose = require('mongoose')
const schema = new mongoose.Schema({
  title: { type: String },
  image: { type: String },
  url: { type: String }
})

module.exports = mongoose.model('Banner', schema)
