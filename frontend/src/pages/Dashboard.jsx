import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getGoals, goalsReset } from '../features/goals/goalsSlice'
import { Typography } from '@mui/material'
import { toast } from 'react-toastify'
import GoalsTable from '../components/GoalsTable'

import Box from '@mui/material/Box'
import Fab from '@mui/material/Fab'
import AddIcon from '@mui/icons-material/Add'
import { Link } from 'react-router-dom'

import ClipLoader from 'react-spinners/ClipLoader'
import { css } from '@emotion/react'

const Dashboard = () => {
  const [myGoals, setMyGoals] = useState([])
  const user = useSelector((state) => state.auth.user)
  const { goals, isLoading } = useSelector((state) => state.goals)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getGoals())
  }, [dispatch, user.token])

  useEffect(() => {
    setMyGoals(goals)
  }, [goals])

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
    <>
      <div style={{ position: 'relative' }}>
        <Typography
          variant="h3"
          color="primary"
          textAlign="center"
          sx={{ my: 3 }}
        >
          Welcome {user.name} to your goals
        </Typography>

        {myGoals && !myGoals.length ? (
          <Typography variant="h4" textAlign="center">
            {user.name}! You have no goals!
          </Typography>
        ) : (
          <GoalsTable goals={myGoals} />
        )}
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
    </>
  )
}

export default Dashboard
