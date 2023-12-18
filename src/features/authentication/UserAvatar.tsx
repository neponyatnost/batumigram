import { FC } from 'react'

interface UserAvatarProps {
  avatar_url?: string
  full_name?: string
}

const UserAvatar: FC<UserAvatarProps> = ({ avatar_url, full_name }) => {
  return (
    <div className='flex gap-5 items-center text-gray-600 text-xl font-medium'>
      <img
        src={avatar_url || '/assets/icons/profile-placeholder.svg'}
        alt={`Avatar of user ${full_name}`}
        className='block w-14 h-14 aspect-square object-cover object-center rounded-full outline-2 outline outline-gray-100'
      />
    </div>
  )
}

export default UserAvatar
