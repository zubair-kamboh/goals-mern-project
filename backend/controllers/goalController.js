const Goal = require('../model/goalModel')
const asyncHandler = require('express-async-handler')
const userModel = require('../model/userModel')

// GET
const getGoals = asyncHandler(async (req, res) => {
  const response = await Goal.find({ user: req.user._id }).populate('user')
  res.json(response)
})

// POST
const setGoal = asyncHandler(async (req, res) => {
  if (!req.body.goal || !req.body.user) {
    res.status(400)
    throw new Error('Please include a goal name & user')
  }

  const user = await userModel.findById(req.body.user)

  if (req.user._id.toString() !== user._id.toString()) {
    res.status(401)
    throw new Error('User not authorized')
  }

  const goal = await Goal.create({
    user: user._id,
    goal: req.body.goal,
  })

  if (goal) {
    res.status(201)
    res.json(goal)
  } else {
    res.status(400)
    throw new Error('Goal cannot created')
  }
})

// PUT
const updateGoal = asyncHandler(async (req, res) => {
  if (!req.body.goal) {
    res.status(400)
    throw new Error('Please include goal name to update')
  }

  const goal = await Goal.findById(req.params.id)

  if (!goal) {
    res.status(400)
    throw new Error('Goal cannot be deleted')
  }

  const user = await userModel.findById(req.user.id)

  if (!user) {
    res.status(404)
    throw new Error('User not found')
  }

  if (goal.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not Authorized')
  }

  Goal.findByIdAndUpdate(
    { _id: req.params.id },
    { goal: req.body.goal },
    { returnDocument: 'after' },
    (err, doc) => {
      if (err) throw err
      res.json(doc)
    }
  )
})

// DELETE
const deleteGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id)

  if (!goal) {
    res.status(400)
    throw new Error('Goal cannot be deleted')
  }

  const user = await userModel.findById(req.user.id)

  if (!user) {
    res.status(404)
    throw new Error('User not found')
  }

  if (goal.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not Authorized')
  }

  await goal.remove()

  res.json({ message: 'goal deleted with an id: ' + goal._id })
})

module.exports = {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
}
