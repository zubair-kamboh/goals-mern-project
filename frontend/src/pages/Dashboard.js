import React from 'react'
import { useSelector } from 'react-redux'

const Dashboard = () => {
  const user = useSelector((state) => state.auth.user)
  return (
    <div>
      {user && (
        <ul>
          <li>{user.name}</li>
          <li>{user.email}</li>
          <li>{user.token}</li>
        </ul>
      )}
    </div>
  )
}

export default Dashboard
