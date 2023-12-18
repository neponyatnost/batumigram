import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { likePost } from '../api'

export function useLikePost(postId?: string, userId?: string) {
  const queryClient = useQueryClient()

  const { mutateAsync, isPending, error } = useMutation({
    mutationFn: () => likePost({ postId, userId }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['posts'],
      })
    },
    onError: () => {
      toast.error('Something went wrong. Please Try again.')
    },
  })

  return { mutateAsync, isPending, error }
}
