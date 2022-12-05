const mongoose = require('mongoose')

const postSchema = mongoose.Schema({
  name: {type: String, required: true},
  hair: {type: String, required: true},
  eyes: {type: String, required: true},
  age: {type: String, required: true},
  power: {type: String, required: true},
  genre: {type: String, required: true},
  imagePath: {type: String, required: true}
})

module.exports = mongoose.model('Post', postSchema)
