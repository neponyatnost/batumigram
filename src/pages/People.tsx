import { FC } from 'react'
import { Link } from 'react-router-dom'
import UserAvatar from '../features/authentication/UserAvatar'
import AddToFollows from '../features/users/AddToFollows'
import UserStats from '../features/users/UserStats'
import { useGetUsers } from '../features/users/hooks/useGetUsers'
import { useGetCurrentUser } from '../hooks/useGetCurrentUser'

interface PeopleProps {}

const People: FC<PeopleProps> = () => {
  const { data: currentUser } = useGetCurrentUser()

  const { data: users } = useGetUsers()

  if (!currentUser) {
    return null
  }

  return (
    <div className='flex flex-1'>
      <div className='home-container'>
        <h2 className='h3-bold md:h2-bold text-left w-full'>All users</h2>
        <div className='user-grid mb-28'>
          {users &&
            users
              .filter((user) => user.id !== currentUser.id)
              .map((user) => (
                <div key={user.id} className='user-card'>
                  <div className='flex justify-between items-center'>
                    <Link
                      to={`/profile/${user.username}`}
                      className='flex items-center justify-between gap-3'
                    >
                      <UserAvatar
                        avatar_url={user.avatar_url}
                        full_name={user.full_name}
                      />
                      <div className='flex flex-col mr-auto'>
                        <p className='body-bold'>{user.full_name}</p>
                        <p className='small-regular text-light-3'>
                          @{user.username}
                        </p>
                      </div>
                    </Link>
                    <AddToFollows
                      followerId={currentUser.id}
                      followingId={user.id || ''}
                    />
                  </div>
                  <UserStats userId={user.id} />
                </div>
              ))}
        </div>
      </div>
    </div>
  )
}

export default People
