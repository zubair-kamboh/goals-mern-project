const mongoose = require('mongoose')

const postsModel = new mongoose.Schema({
  title: String,
  description: String,
})

module.exports = mongoose.model('posts', postsModel)
