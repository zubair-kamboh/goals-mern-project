import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from './authService'

let LSUser = JSON.parse(localStorage.getItem('user'))

const initialState = {
  user: LSUser ? LSUser : null,
  isSuccess: false,
  isError: false,
  isLoading: false,
  message: '',
}

// register
export const register = createAsyncThunk(
  'auth/register',
  async (data, ThunkAPI) => {
    try {
      return await authService.register(data)
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

// login
export const login = createAsyncThunk('auth/login', async (data, ThunkAPI) => {
  try {
    return await authService.login(data)
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString()
    return ThunkAPI.rejectWithValue(message)
  }
})

// logout
export const logout = createAsyncThunk('auth/logout', async () => {
  return await authService.logout()
})

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.user = null
      state.isError = false
      state.isSuccess = false
      state.isLoading = false
      state.message = ''
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true
      })

      .addCase(register.fulfilled, (state, actions) => {
        state.user = actions.payload
        state.isSuccess = true
        state.isLoading = false
      })

      .addCase(register.rejected, (state, actions) => {
        state.isSuccess = false
        state.isError = true
        state.isLoading = false
        state.message = actions.payload
        state.user = null
      })

      .addCase(login.pending, (state) => {
        state.isLoading = true
      })

      .addCase(login.fulfilled, (state, actions) => {
        state.user = actions.payload
        state.isSuccess = true
        state.isError = false
        state.isLoading = false
        state.message = ''
      })

      .addCase(login.rejected, (state, actions) => {
        state.isSuccess = false
        state.isError = true
        state.isLoading = false
        state.message = actions.payload
        state.user = null
      })
  },
})

export const { reset } = authSlice.actions
export default authSlice.reducer
