import { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import { Button, Container, Typography } from '@mui/material'
import LoginIcon from '@mui/icons-material/Login'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../features/auth/authSlice'
import { useDispatch, useSelector } from 'react-redux'
import RingLoader from 'react-spinners/RingLoader'
import { toast } from 'react-toastify'
import { css } from '@emotion/react'

export default function Signin() {
  const [data, setData] = useState({
    email: '',
    password: '',
  })

  const { email, password } = data

  const { isError, isLoading, message } = useSelector((state) => state.auth)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
  }, [isError, message])

  const onSubmit = (e) => {
    e.preventDefault()

    if (!email || !password) {
      return toast.error('Please fill in the form')
    }

    dispatch(
      login({
        email,
        password,
      })
    )

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
          Login <LoginIcon sx={{ fontSize: 50 }} />
        </Typography>
        <Typography variant="h6" textAlign="center">
          Pleae login to your account
        </Typography>
        <Box
          component="form"
          onSubmit={onSubmit}
          sx={{
            '& > :not(style)': { m: 1, width: '100%' },
          }}
        >
          <TextField
            id="email"
            fullWidth
            label="Enter your email"
            variant="outlined"
            name="email"
            type="email"
            value={email}
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
          <Button type="submit" variant="contained" color="primary">
            Login
          </Button>
        </Box>
        <Link to="/register">Don't have an account? please register</Link>
      </Container>
    </Box>
  )
}
