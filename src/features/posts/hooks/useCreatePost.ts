import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { createPost } from '../api'

export function useCreatePost() {
  const queryClient = useQueryClient()

  const { mutate, isPending, data } = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      toast.success('Post was successfully created.')
      queryClient.invalidateQueries({
        queryKey: ['posts'],
      })
    },
    onError: (error: Error) => {
      toast.error('use create post error ' + error.message)
      console.log('use create post error ' + error)
    },
  })

  return { mutate, isPending, data }
}
