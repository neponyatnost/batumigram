import { FC, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGetCurrentUser } from '../hooks/useGetCurrentUser'
import Spinner from './Spinner'

interface ProtectedRouteProps {
  children: React.ReactElement
}

const ProtectedRoute: FC<ProtectedRouteProps> = ({ children }) => {
  const navigate = useNavigate()

  const { isLoading, isAuthenticated } = useGetCurrentUser()

  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      navigate('/sign-in')
    }
  }, [isAuthenticated, navigate, isLoading])

  if (isLoading) {
    return (
      <div className='h-full bg-black flex items-center justify-center w-full'>
        <Spinner />
      </div>
    )
  }

  if (isAuthenticated) {
    return children
  }

  return null
}

export default ProtectedRoute
