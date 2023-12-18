import { useQuery } from '@tanstack/react-query'
import { getCurrentUser } from '../features/authentication/api'

export function useGetCurrentUser() {
  const { data, isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: getCurrentUser,
  })

  return {
    data,
    isLoading,
    isAuthenticated: data?.role === 'authenticated',
  }
}
