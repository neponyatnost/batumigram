import { FC } from 'react'
import { Outlet } from 'react-router-dom'
import BottomBar from './BottomBar'
import LeftBar from './LeftBar'
import TopBar from './TopBar'

interface AppLayoutProps {}

const AppLayout: FC<AppLayoutProps> = () => {
  return (
    <div className='w-full md:flex'>
      <TopBar />
      <LeftBar />
      <section className='flex flex-1 h-full'>
        <Outlet />
      </section>
      <BottomBar />
    </div>
  )
}

export default AppLayout
