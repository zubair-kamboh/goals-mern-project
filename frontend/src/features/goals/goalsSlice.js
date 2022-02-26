import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import goalService from './goalsService'

// const goals = JSON.parse(localStorage.getItem('goals'))

const initialState = {
  goals: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// get goals
export const getGoals = createAsyncThunk(
  'goals/all',
  async (token, ThunkAPI) => {
    try {
      const { token } = ThunkAPI.getState().auth.user
      return await goalService.getAllGoals(token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return ThunkAPI.rejectWithValue(message)
    }
  }
)
// update goal
export const updateGoal = createAsyncThunk(
  'goals/update',
  async (updateData, ThunkAPI) => {
    try {
      return await goalService.updateGoal(updateData)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return ThunkAPI.rejectWithValue(message)
    }
  }
)
// delete goal
export const deleteGoal = createAsyncThunk(
  'goals/delete',
  async (id, ThunkAPI) => {
    try {
      const { token } = ThunkAPI.getState().auth.user
      return await goalService.deleteGoal(id, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return ThunkAPI.rejectWithValue(message)
    }
  }
)

// add goal
export const addGoal = createAsyncThunk('goals/add', async (goal, ThunkAPI) => {
  try {
    const { _id, token } = ThunkAPI.getState().auth.user
    return await goalService.addGoal(_id, token, goal)
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString()
    return ThunkAPI.rejectWithValue(message)
  }
})

export const goalsSlice = createSlice({
  name: 'goals',
  initialState,
  reducers: {
    goalsReset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(getGoals.pending, (state) => {
      state.isLoading = true
      state.isSuccess = false
      state.isError = false
    })
    builder.addCase(getGoals.fulfilled, (state, actions) => {
      state.goals = actions.payload
      state.isLoading = false
      state.isSuccess = true
    })
    builder.addCase(getGoals.rejected, (state, actions) => {
      state.goals = null
      state.isLoading = false
      state.isSuccess = false
      state.isError = true
      state.message = actions.payload
    })

    // update goal
    builder.addCase(updateGoal.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(updateGoal.fulfilled, (state, actions) => {
      state.goals = actions.payload
      state.isLoading = false
      state.isSuccess = true
    })
    builder.addCase(updateGoal.rejected, (state, actions) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = true
      state.message = actions.payload
    })

    // delete goal
    builder.addCase(deleteGoal.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(deleteGoal.fulfilled, (state, actions) => {
      state.goals = state.goals.filter(
        (goal) => goal._id !== actions.payload.id
      )
      state.isLoading = false
      state.isSuccess = true
    })
    builder.addCase(deleteGoal.rejected, (state, actions) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = true
      state.message = actions.payload
    })

    // add goal
    builder.addCase(addGoal.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(addGoal.fulfilled, (state, actions) => {
      state.goals.push(actions.payload)
      state.isLoading = false
      state.isSuccess = true
    })
    builder.addCase(addGoal.rejected, (state, actions) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = true
      state.message = actions.payload
    })
  },
})

export const { goalsReset } = goalsSlice.actions
export default goalsSlice.reducer
