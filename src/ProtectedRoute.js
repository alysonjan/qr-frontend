import { Auth } from './context/AuthContext'
import React, { useContext } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

const useAuth = () => {
  const { user } = useContext(Auth)
  return user && user
}

const ProtectedRoute = () => {
  const location = useLocation()
  const isAuth = useAuth()

  return isAuth ? (
    <Outlet />
  ) : (
    <Navigate to="/" replace state={{ from: location }} />
  )
}

export default ProtectedRoute
