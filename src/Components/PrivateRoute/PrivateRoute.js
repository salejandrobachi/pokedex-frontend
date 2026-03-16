import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../Context/AuthContext'

function PrivateRoute({ children, adminOnly = false }) {
  const { isAuthenticated, user, loading } = useAuth()
  const location = useLocation()

  if (loading) return null

  if (!isAuthenticated) {
    return <Navigate to='/login' state={{ from: location.pathname }} replace />
  }

  if (adminOnly && user?.role !== 'admin') {
    return <Navigate to='/' replace />
  }

  return children
}

export default PrivateRoute
