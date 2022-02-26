import { useState } from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import { Button, Container, Typography } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addGoal } from '../features/goals/goalsSlice'
import { toast } from 'react-toastify'
import EditIcon from '@mui/icons-material/Edit'

export default function AddGoal() {
  const [goal, setGoal] = useState('')

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)

  const onSubmit = (e) => {
    e.preventDefault()

    if (!goal) {
      return toast.error('Please fill in the form')
    }

    dispatch(addGoal(goal))
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
          Add Goal <EditIcon sx={{ fontSize: 50 }} />
        </Typography>
        <Typography variant="h6" textAlign="center">
          Pleae Add Your Goal
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
            Add Goal
          </Button>
        </Box>
        <Link to="/">Want to go back?</Link>
      </Container>
    </Box>
  )
}
