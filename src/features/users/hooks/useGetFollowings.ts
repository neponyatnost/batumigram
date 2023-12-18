import { useQuery } from '@tanstack/react-query'
import { getUserFollowings } from '../api'

export function useGetFollowings(userId: string) {
  const { data, error, isLoading } = useQuery({
    queryKey: ['followings', userId],
    queryFn: () => getUserFollowings(userId),
    enabled: !!userId,
  })

  return { data, error, isLoading }
}
