import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { signup } from '../api'

export function useSignUp() {
  const navigate = useNavigate()

  const { mutate, isPending } = useMutation({
    mutationFn: signup,
    onSuccess: () => {
      navigate('/')
      setTimeout(() => toast.success('You have successfully registered!'), 500)
    },
    onError: (error: Error) => {
      toast.error(error.message)
    },
  })

  return { mutate, isPending }
}
