import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { getPostById } from '../api'

export function useGetPostById() {
  const { postId } = useParams()

  const { data, isLoading, error } = useQuery({
    queryKey: ['post', postId],
    queryFn: () => getPostById({ postId }),
    retry: false,
  })

  return { data, isLoading, error }
}
