import axios from 'axios'

// get goals
const getAllGoals = async (token) => {
  const res = await axios.get('/api/goals', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return res.data
}

// update goal
const updateGoal = async (updateData) => {
  const res = await axios.put(
    `/api/goals/${updateData.id}`,
    { goal: updateData.goal },
    {
      headers: {
        Authorization: `Bearer ${updateData.token}`,
      },
    }
  )
  return res.data
}

//  delete goal
const deleteGoal = async (id, token) => {
  const res = await axios.delete(`/api/goals/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return res.data
}

// add goal
const addGoal = async (id, token, goal) => {
  console.log(id, token, goal)
  const res = await axios.post(
    `/api/goals`,
    {
      user: id,
      goal,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
  return res.data
}

const goals = {
  getAllGoals,
  updateGoal,
  deleteGoal,
  addGoal,
}

export default goals
