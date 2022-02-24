const express = require('express')

const {
  register,
  login,
  currentUser,
} = require('../controllers/userControllers')
const { protect } = require('../middlewares/authMiddleware')
const Router = express.Router()

// @route   /api/users/register
Router.post('/register', register)

// @route   /api/users/login
Router.post('/login', login)

// @route   /api/users/
Router.get('/me', protect, currentUser)

module.exports = Router
