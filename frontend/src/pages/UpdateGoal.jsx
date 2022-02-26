import { useState } from 'react'
import { useParams } from 'react-router-dom'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import { Button, Container, Typography } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { updateGoal } from '../features/goals/goalsSlice'
import { toast } from 'react-toastify'
import EditIcon from '@mui/icons-material/Edit'

export default function UpdateGoal() {
  const [goal, setGoal] = useState('')
  const { id } = useParams()

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)

  console.log(user && user)

  const onSubmit = (e) => {
    e.preventDefault()

    if (!goal) {
      return toast.error('Please fill in the form')
    }

    const data = {
      id,
      goal,
      token: user.token,
    }

    dispatch(updateGoal(data))
    navigate('/')
  }

  const onChange = (e) => {
    setGoal(e.target.value)
  }

  return (
    <Box component="section" sx={{ my: 5 }}>
      <Container maxWidth="sm">
        <Typography
          variant="h2"
          textAlign="center"
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          Update Goal <EditIcon sx={{ fontSize: 50 }} />
        </Typography>
        <Typography variant="h6" textAlign="center">
          Pleae Update Your Goal
        </Typography>
        <Box
          component="form"
          onSubmit={onSubmit}
          sx={{
            '& > :not(style)': { m: 1, width: '100%' },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="goal"
            fullWidth
            label="Enter your goal"
            variant="outlined"
            name="goal"
            type="goal"
            value={goal}
            onChange={onChange}
          />

          <Button type="submit" variant="contained" color="primary">
            Update Goal
          </Button>
        </Box>
        <Link to="/">Want to go back</Link>
      </Container>
    </Box>
  )
}
