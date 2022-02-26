import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import { Button, Container, Typography } from '@mui/material'
import HowToRegIcon from '@mui/icons-material/HowToReg'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { register, reset } from '../features/auth/authSlice'
import { toast } from 'react-toastify'
import { css } from '@emotion/react'
import RingLoader from 'react-spinners/RingLoader'

export default function Signup() {
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  })

  const { name, email, password, password2 } = data

  const { user, isError, isLoading, isSuccess, message } = useSelector(
    (state) => state.auth
  )

  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    if (isError) {
      toast.error(message.message)
    }

    if (isSuccess || user) {
      navigate('/')
    }

    dispatch(reset())
  }, [isError, isSuccess, user, navigate, dispatch, message.message])

  const onSubmit = async (e) => {
    e.preventDefault()

    if (!name || !email || !password || !password2) {
      toast.error('Please include all the fields')
      return
    }

    if (password !== password2) {
      toast.error('Passwords do not match')
      return
    }

    dispatch(
      register({
        name,
        email,
        password,
      })
    )
    toast('Success! registered!')
    navigate('/')
  }

  const onChange = (e) => {
    setData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

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
        <RingLoader
          color="#D0021B"
          loading={isLoading}
          css={override}
          size={150}
        />
      </div>
    )
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
          Register <HowToRegIcon sx={{ fontSize: 50 }} />
        </Typography>
        <Typography variant="h6" textAlign="center">
          Pleae register a new user
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
            id="name"
            fullWidth
            label="Enter your name"
            variant="outlined"
            type="text"
            name="name"
            value={name}
            onChange={onChange}
          />
          <TextField
            id="email"
            fullWidth
            type="email"
            label="Enter your email"
            variant="outlined"
            value={email}
            name="email"
            onChange={onChange}
          />

          <TextField
            id="password"
            fullWidth
            label="Enter your password"
            variant="outlined"
            name="password"
            type="password"
            value={password}
            onChange={onChange}
          />
          <TextField
            id="password2"
            fullWidth
            type="password"
            label="Confirm password"
            variant="outlined"
            name="password2"
            value={password2}
            onChange={onChange}
          />
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </Box>

        <Link to="/login">Already registered? please login</Link>
      </Container>
    </Box>
  )
}
