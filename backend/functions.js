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

module.exports = {
  fetchUser,
}
