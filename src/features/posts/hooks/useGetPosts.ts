import { useQuery } from '@tanstack/react-query'
import { getPosts } from '../api'

export function useGetPosts() {
  const {
    data: posts,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['posts'],
    queryFn: getPosts,
  })

  return { posts, isLoading, error }
}
