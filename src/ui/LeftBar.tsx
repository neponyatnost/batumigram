import { FC } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { sidebarLinks } from '../constants'
import { useLogout } from '../features/authentication/hooks/useLogout'
import { useGetCurrentUser } from '../hooks/useGetCurrentUser'
import { storageAvatarsUrl } from '../services/supabase'
import { Button } from '../ui/Button'
import SpinnerMini from './SpinnerMini'

interface LeftBarProps {}

const LeftBar: FC<LeftBarProps> = () => {
  const { pathname } = useLocation()

  const { mutate: logout, isPending } = useLogout()

  const { data: authData } = useGetCurrentUser()

  return (
    <nav className='leftsidebar border-r border-teal-900 overflow-y-auto'>
      <div className='flex flex-col gap-5'>
        <Link to={'/'} className=''>
          <img
            src='/assets/images/logo.svg'
            alt='Logo'
            width={171}
            height={36}
          />
        </Link>
        <Link
          to={`/profile/${authData?.user_metadata.username}`}
          className='flex gap-3 items-center'
        >
          <div className='flex gap-5 items-center text-gray-600 text-xl font-medium'>
            <img
              src={
                storageAvatarsUrl + authData?.user_metadata.username ||
                '/assets/icons/profile-placeholder.svg'
              }
              alt={`Avatar of user ${authData?.user_metadata.full_name}`}
              className='block w-14 h-14 aspect-square object-cover object-center rounded-full outline-2 outline outline-gray-100'
            />
          </div>
          <div className='flex flex-col'>
            <p className='body-bold'>{authData?.user_metadata.full_name}</p>
            <p className='small-regular text-light-3'>
              @{authData?.user_metadata.username}
            </p>
          </div>
        </Link>
        <ul className='flex flex-col gap-6'>
          {sidebarLinks.map((link) => {
            const isActive = pathname === link.route
            return (
              <li
                key={link.id}
                className={`leftsidebar-link group ${
                  isActive && 'bg-primary-500'
                }`}
              >
                <NavLink
                  to={link.route}
                  className='flex gap-4 items-center p-4'
                >
                  <img
                    width={24}
                    height={24}
                    src={link.imgURL}
                    alt={link.label}
                    className={`group-hover:invert-white ${
                      isActive && 'invert-white'
                    }`}
                  />
                  {link.label}
                </NavLink>
              </li>
            )
          })}
        </ul>
      </div>
      <Button
        variant={'ghost'}
        className='shad-button_ghost'
        onClick={() => logout()}
        disabled={isPending}
      >
        {isPending ? (
          <div className='flex-center gap-2'>
            <SpinnerMini />
          </div>
        ) : (
          <>
            <img src='/assets/icons/logout.svg' alt='Logout' />
            <p className='small-medium lg:base-medium group-hover:invert-white'>
              Log Out
            </p>
          </>
        )}
      </Button>
    </nav>
  )
}

export default LeftBar
