import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'
import { Button } from '../../ui/Button'
import { Input } from '../../ui/Input'
import SpinnerMini from '../../ui/SpinnerMini'
import { useLogin } from './hooks/useLogin'

interface LoginFormProps {
  email: string
  password: string
}

const LoginForm = () => {
  const { register, reset, handleSubmit } = useForm<LoginFormProps>()

  const { mutate: signIn, isPending, error } = useLogin()

  const onSubmit = ({
    email,
    password,
  }: {
    email: string
    password: string
  }) => {
    signIn({ email, password }, { onSettled: () => reset() })
  }

  useEffect(() => {
    if (error) {
      toast.error(error.message + '. Please try again.')
    }
  }, [error])

  return (
    <div className='sm:w-420 flex-center flex-col'>
      <img src='/assets/images/logo.svg' alt='logo' />
      <h2 className='h3-bold md:h2-bold pt-5 sm:pt-12'>
        Log in to your account
      </h2>
      <p className='text-xs text-slate-400'>*all fields are required.</p>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex flex-col gap-5 w-full mt-4'
      >
        <label htmlFor='email'>Email:</label>
        <Input
          type='email'
          className='shad-input'
          id='email'
          autoComplete='email'
          {...register('email', {
            required: 'This field is required',
          })}
        />

        <label htmlFor='password'>Password:</label>

        <Input
          type='password'
          id='password'
          autoComplete='password'
          className='shad-input'
          {...register('password', {
            required: 'This field is required',
          })}
        />

        <Button type='submit' className='shad-button bg-teal-500'>
          {isPending ? (
            <div className='flex-center gap-2'>
              <SpinnerMini />
            </div>
          ) : (
            'Log In'
          )}
        </Button>
        <p className='text-small-regular text-light-2 text-center mt-2'>
          Don't you have an account?{' '}
          <Link to='/sign-up' className='text-teal-500'>
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  )
}

export default LoginForm
