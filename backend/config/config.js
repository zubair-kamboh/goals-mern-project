const mongoose = require('mongoose')

const connection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('Connected to db')
  } catch (err) {
    console.log('something not good')
  }
}

module.exports = connection
