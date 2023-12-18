import { useQuery } from '@tanstack/react-query'
import { getUsers } from '../api'

export function useGetUsers() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['all-users'],
    queryFn: getUsers,
  })

  return { data, isLoading, error }
}
