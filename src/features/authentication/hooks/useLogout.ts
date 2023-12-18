import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { logout } from '../api'

export function useLogout() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const { mutate, isPending, error } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.removeQueries()
      navigate('/sign-in', { replace: true })
      setTimeout(() => toast.success('You have successfully logged out!'), 1000)
    },
    onError: (error: Error) => {
      toast.error(error.message)
    },
  })

  return { mutate, isPending, error }
}
