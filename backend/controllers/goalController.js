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

  const populatedGoal = await Goal.findById(goal._id).populate('user')

  if (populatedGoal) {
    res.status(201)
    res.json(populatedGoal)
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
    throw new Error('Goal cannot be updated')
  }

  if (!req.user) {
    res.status(404)
    throw new Error('User not found')
  }

  if (goal.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not Authorized')
  }

  const updatedGoal = await Goal.findByIdAndUpdate(
    { _id: req.params.id },
    { goal: req.body.goal }
  )

  if (!updatedGoal) {
    throw new Error('Goal cannot be updated')
  } else {
    const allGoals = await Goal.find({ user: req.user._id }).populate('user')
    res.json(allGoals)
  }
})

// DELETE
const deleteGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id)

  if (!goal) {
    res.status(400)
    throw new Error('Goal cannot be deleted')
  }

  if (!req.user) {
    res.status(404)
    throw new Error('User not found')
  }

  if (goal.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not Authorized')
  }

  await goal.remove()

  res.json({
    id: goal._id,
  })
})

module.exports = {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
}
