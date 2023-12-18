import { FC } from 'react'
import { Link } from 'react-router-dom'
import { useLogout } from '../features/authentication/hooks/useLogout'
import { useGetCurrentUser } from '../hooks/useGetCurrentUser'
import { Button } from '../ui/Button'
import SpinnerMini from './SpinnerMini'

interface TopBarProps {}

const TopBar: FC<TopBarProps> = () => {
  const { data: user } = useGetCurrentUser()

  const { mutate: logout, isPending } = useLogout()

  return (
    <section className='topbar'>
      <div className='flex-between py-2 px-3'>
        <Link to={'/'} className=''>
          <img
            src='/assets/images/logo.svg'
            alt='Logo'
            width={150}
            height={32}
          />
        </Link>
        <div className='flex gap-4'>
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
              <img src='/assets/icons/logout.svg' alt='Logout' />
            )}
          </Button>
          <Link to={`/profile/username`} className='flex-center gap-3'>
            <img
              src={
                user?.user_metadata.avatar_url ||
                '/assets/icons/profile-placeholder.svg'
              }
              alt='Avatar'
              className='h-8 w-8 rounded-full flex flex-center items-center'
            />
          </Link>
        </div>
      </div>
    </section>
  )
}

export default TopBar
