import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { login } from '../api'

export function useLogin() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const { mutate, isPending, error } = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      login({ email, password }),
    onSuccess: (user) => {
      queryClient.setQueryData(['user'], ['user', user.user])
      navigate('/')
      setTimeout(() => toast.success('You have successfully logged in!'), 1000)
    },
    onError: (error: Error) => {
      toast.error(error.message)
    },
  })

  return { mutate, isPending, error }
}
