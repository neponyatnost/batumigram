import { FC, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { Button } from '../../ui/Button'
import { Input } from '../../ui/Input'
import SpinnerMini from '../../ui/SpinnerMini'
import { useSignUp } from './hooks/useSignUp'
import { IUser } from './types'

interface SignUpFormProps {}

const SignUpForm: FC<SignUpFormProps> = () => {
  const [avatarFile, setAvatarFile] = useState<File>()

  const { register, handleSubmit, reset } = useForm<IUser>()

  const { mutate: signUp, isPending } = useSignUp()

  const onSubmit = ({ full_name, email, password, username }: IUser) => {
    signUp(
      {
        email,
        username,
        password,
        full_name,
        avatarFile,
      },
      {
        onSettled: () => reset(),
      }
    )
  }

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      setAvatarFile(files[0])
    }
  }

  return (
    <div className='sm:w-420 flex-center flex-col'>
      <img src='/assets/images/logo.svg' alt='logo' />
      <h2 className='h3-bold md:h2-bold pt-5 sm:pt-12'>Create new account</h2>
      <p className='text-xs text-slate-400'>*all fields are required.</p>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex flex-col gap-5 w-full mt-4'
      >
        <label htmlFor='full_name'>Name:</label>
        <Input
          type='text'
          className='shad-input'
          id='full_name'
          {...register('full_name', {
            required: 'This field is required',
          })}
        />

        <label htmlFor='username'>Username:</label>
        <Input
          type='text'
          className='shad-input'
          id='username'
          autoComplete='username'
          {...register('username', {
            required: 'This field is required',
          })}
        />

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

        <label htmlFor='avatarFile'>Avatar:</label>
        <Input
          type='file'
          id='avatarFile'
          accept='image/*'
          content='File'
          onChange={handleAvatarChange}
        />

        <label htmlFor='password'>Password:</label>
        <Input
          type='password'
          className='shad-input'
          id='password'
          {...register('password', {
            required: 'This field is required',
          })}
        />

        <Button
          type='submit'
          className='shad-button bg-teal-500'
          disabled={isPending}
        >
          {isPending ? (
            <div className='flex-center gap-2'>
              <SpinnerMini />
            </div>
          ) : (
            'Sign Up'
          )}
        </Button>
        <p className='text-small-regular text-light-2 text-center mt-2'>
          Already have an account?{' '}
          <Link to='/sign-in' className='text-teal-500'>
            Log In
          </Link>
        </p>
      </form>
    </div>
  )
}

export default SignUpForm
