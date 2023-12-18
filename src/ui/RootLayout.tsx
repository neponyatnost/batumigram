import { FC } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useGetCurrentUser } from '../hooks/useGetCurrentUser'
import BottomBar from './BottomBar'
import LeftBar from './LeftBar'
import TopBar from './TopBar'

interface RootLayoutProps {}

const RootLayout: FC<RootLayoutProps> = () => {
  const { isAuthenticated } = useGetCurrentUser()

  return (
    <>
      {isAuthenticated ? (
        <div className='w-full md:flex'>
          <TopBar />
          <LeftBar />
          <section className='flex flex-1 h-full'>
            <Outlet />
          </section>
          <BottomBar />
        </div>
      ) : (
        <Navigate to='/sign-in' />
      )}
    </>
  )
}

export default RootLayout
