const express = require('express')
const router = express.Router()

const axios = require('axios')

const fetchUser = async (req, res) => {
  try {
    axios
      .get('http://localhost:5000/api/goals')
      .then((response) =>
        res.render('home', {
          data: response.data,
        })
      )
      .catch((err) => res.send(err))
  } catch (err) {
    res.send(err)
  }
}

router.get('/', fetchUser)

router.get('/update-goal', (req, res) => {
  console.log(req.query)
  axios
    .get('http://localhost:5000/api/goals', { params: { id: req.query.id } })
    .then((response) => res.render('update', { data: response.data }))
    .catch((err) => res.send(err))
})

module.exports = router
