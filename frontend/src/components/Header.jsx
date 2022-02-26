import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import MenuItem from '@mui/material/MenuItem'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { logout, reset } from '../features/auth/authSlice'
import { goalsReset } from '../features/goals/goalsSlice'

const pages = ['Home', 'About', 'Contact']

const Header = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null)

  const dispatch = useDispatch()

  const { user, isLoading } = useSelector((state) => state.auth)

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    dispatch(goalsReset())
    toast('Success! logged out!')
  }

  return (
    <AppBar
      position="static"
      color="primary"
      sx={isLoading ? { display: 'none' } : { display: 'block' }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
          >
            Goals
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          >
            Goals
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0, display: 'flex' }}>
            {!user ? (
              <>
                <Box>
                  <Tooltip title="Login">
                    <IconButton sx={{ p: 0 }}>
                      <Button
                        component={Link}
                        to="/login"
                        color="primary"
                        variant="contained"
                      >
                        Login
                      </Button>
                    </IconButton>
                  </Tooltip>
                </Box>
                <Box sx={{ ml: 3 }}>
                  <Tooltip title="Register">
                    <IconButton sx={{ p: 0 }}>
                      <Button
                        component={Link}
                        to="/register"
                        color="primary"
                        variant="contained"
                      >
                        Register
                      </Button>
                    </IconButton>
                  </Tooltip>
                </Box>
              </>
            ) : (
              <Box>
                <Tooltip title="Logout">
                  <IconButton sx={{ p: 0 }} onClick={onLogout}>
                    <Button color="primary" variant="contained">
                      Logout
                    </Button>
                  </IconButton>
                </Tooltip>
              </Box>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
export default Header
