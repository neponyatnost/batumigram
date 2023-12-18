import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { savePost } from '../api'

export function useSavePost(postId?: string, userId?: string) {
  const queryClient = useQueryClient()

  const { mutate, isPending, error } = useMutation({
    mutationFn: () => savePost({ postId, userId }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['posts'],
      })
    },
    onError: () => {
      toast.error('Something went wrong. Please Try again.')
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ['posts'],
      })
    },
  })

  return { mutate, isPending, error }
}
