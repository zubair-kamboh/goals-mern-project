const mongoose = require('mongoose')

const userModel = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please include a name'],
    },
    email: {
      type: String,
      required: [true, 'Please include an email'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Please include a password'],
    },
  },
  {
    timestamps: true,
  }
)

module.exports = new mongoose.model('users', userModel)
