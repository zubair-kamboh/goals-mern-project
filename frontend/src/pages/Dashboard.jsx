import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getGoals } from '../features/goals/goalsSlice'
import { Typography } from '@mui/material'
import { toast } from 'react-toastify'
import GoalsTable from '../components/GoalsTable'

import Box from '@mui/material/Box'
import Fab from '@mui/material/Fab'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import FavoriteIcon from '@mui/icons-material/Favorite'
import NavigationIcon from '@mui/icons-material/Navigation'
import { Link } from 'react-router-dom'

import ClipLoader from 'react-spinners/ClipLoader'
import { css } from '@emotion/react'

const Dashboard = () => {
  const user = useSelector((state) => state.auth.user)
  const { goals, isLoading } = useSelector((state) => state.goals)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getGoals(user.token))
  }, [dispatch, user.token])

  useEffect(() => {
    if (isLoading) {
      toast('Your goals are loading')
    }
  }, [isLoading])

  const override = css`
    display: block;
  `

  if (isLoading) {
    return (
      <div
        style={{
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'hidden',
        }}
      >
        <ClipLoader
          color="#28B3E9"
          loading={isLoading}
          css={override}
          size={50}
        />
      </div>
    )
  }

  return (
    <div style={{ position: 'relative' }}>
      <Typography
        variant="h3"
        color="primary"
        textAlign="center"
        sx={{ my: 3 }}
      >
        Welcome {user.name} to your goals
      </Typography>
      <GoalsTable goals={goals} />

      <Box
        component={Link}
        to="/add-goal"
        sx={{
          '& > :not(style)': { m: 1 },
          position: 'absolute',
          bottom: '-40%',
          left: '50%',
          transform: 'translate(-50%, 40%)',
        }}
      >
        <Fab color="primary" aria-label="add">
          <AddIcon />
        </Fab>
      </Box>
    </div>
  )
}

export default Dashboard
