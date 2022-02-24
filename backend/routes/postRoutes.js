const express = require('express')
const router = express.Router()
const Posts = require('../model/postModel')

router.get('/', async (req, res) => {
  const posts = await Posts.find()

  res.json(posts)
})

router.post('/', async (req, res) => {
  const posts = await Posts.create({
    title: req.body.title,
    description: req.body.description,
  })

  res.json(posts)
})

module.exports = router
