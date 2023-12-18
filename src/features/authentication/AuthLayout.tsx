import { Navigate, Outlet } from 'react-router-dom'
import { useGetCurrentUser } from '../../hooks/useGetCurrentUser'

const AuthLayout = () => {
  const { isAuthenticated } = useGetCurrentUser()

  return (
    <>
      {isAuthenticated ? (
        <Navigate to={'/'} />
      ) : (
        <>
          <section className='flex flex-1 justify-center items-center flex-col py-10'>
            <Outlet />
          </section>
          <img
            src='/assets/images/login.jpg'
            alt='Bg logo'
            className='hidden xl:block h-screen w-1/2 object-cover bg-no-repeat'
          />
        </>
      )}
    </>
  )
}

export default AuthLayout
