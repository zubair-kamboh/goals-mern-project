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
const deleteGoal = async (deleteData) => {
  const res = await axios.delete(`/api/goals/${deleteData.id}`, {
    headers: {
      Authorization: `Bearer ${deleteData.token}`,
    },
  })
  return res.data
}

// add goal
const addGoal = async (data) => {
  const res = await axios.post(
    `/api/goals/`,
    {
      user: data.user,
      goal: data.goal,
    },
    {
      headers: {
        Authorization: `Bearer ${data.token}`,
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
