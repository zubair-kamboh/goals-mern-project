const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const User = require('../model/userModel')
const bcrypt = require('bcryptjs')

// @desc       Register Route
// @route      /api/users/register
// @method     POST
// @access     PUBLIC
const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body

  if (!name || !email || !password) {
    res.status(400)
    throw new Error('Please include all the fields')
  }

  const user = await User.findOne({ email })

  if (user) {
    res.status(400)
    throw new Error('User already registered with that email')
  }

  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  const savedUser = await User.create({
    name,
    email,
    password: hashedPassword,
  })

  if (savedUser) {
    res.status(201)
    res.json({
      _id: savedUser.id,
      name: savedUser.name,
      email: savedUser.email,
      token: generateToken(savedUser._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid User Data')
  }
})

// @desc       Login Route
// @route      /api/users/login
// @method     POST
// @access     PUBLIC
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    res.status(400)
    throw new Error('Please include all the fields')
  }

  const user = await User.findOne({ email })

  if (user) {
    const matchedPassword = await bcrypt.compare(password, user.password)
    if (matchedPassword) {
      res.status(200)
      res.json({
        _id: user.id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      })
    } else {
      res.status(400)
      throw new Error('Please enter correct password')
    }
  } else {
    res.status(404)
    throw new Error('No user found with that email')
  }
})

// @desc       Me
// @route      /api/users/me
// @method     GET
// @access     PRIVATE
const currentUser = asyncHandler(async (req, res) => {
  const { _id, name, email } = await User.findById(req.user._id)

  res.json({
    id: _id,
    name,
    email,
  })
})

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  })
}

module.exports = {
  register,
  login,
  currentUser,
}
