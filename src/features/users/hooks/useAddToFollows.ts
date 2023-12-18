import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { checkAndToggleSubscription } from '../api'

export function useAddToFollows(followerId: string, followingId: string) {
  const queryClient = useQueryClient()

  const { mutate, error, isPending } = useMutation({
    mutationKey: ['followers'],
    mutationFn: () => checkAndToggleSubscription(followerId, followingId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['followers'],
      })
      toast.success('Successfully followed.')
    },
  })

  return { mutate, error, isPending }
}
