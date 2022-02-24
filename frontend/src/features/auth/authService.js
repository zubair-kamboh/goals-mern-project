import axios from 'axios'

const API_URL = '/api/users/'

// register
const register = async (data) => {
  const user = await axios.post(`${API_URL}register`, data)

  if (user.data) {
    localStorage.setItem('user', JSON.stringify(user.data))
  }

  return user.data
}

// login
const login = async (data) => {
  const user = await axios.post(`${API_URL}login`, data)

  if (user.data) {
    localStorage.setItem('user', JSON.stringify(user.data))
  }

  return user.data
}

// logout
const logout = async () => {
  return localStorage.removeItem('user')
}

const serviceFunctions = {
  register,
  login,
  logout,
}

export default serviceFunctions
