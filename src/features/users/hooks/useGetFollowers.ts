import { useQuery } from '@tanstack/react-query'
import { getUserFollowers } from '../api'

export function useGetFollowers(userId: string) {
  const { data, error, isLoading } = useQuery({
    queryKey: ['followers', userId],
    queryFn: () => getUserFollowers(userId),
    enabled: !!userId,
  })

  return { data, error, isLoading }
}
