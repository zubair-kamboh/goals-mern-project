import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

export const IsAuth = ({ children }) => {
  const { user } = useSelector((state) => state.auth)
  return user ? children : <Navigate to="/login" />
}

export const IsNotAuth = ({ children }) => {
  const { user } = useSelector((state) => state.auth)
  return !user ? children : <Navigate to="/" />
}
