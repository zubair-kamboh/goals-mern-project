const mongoose = require('mongoose')

const connection = async () => {
  try {
    await mongoose.connect(
      'mongodb+srv://zubairali:zubairali@zubaircluster.oe4wp.mongodb.net/goalsdb?retryWrites=true&w=majority'
    )
    console.log('Connected to db')
  } catch (err) {
    console.log('something not good')
  }
}

module.exports = connection
