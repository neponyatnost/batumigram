import { FC } from 'react'
import { useGetFollowers } from './hooks/useGetFollowers'
import { useGetFollowings } from './hooks/useGetFollowings'

interface UserStatsProps {
  userId?: string
}

const UserStats: FC<UserStatsProps> = ({ userId }) => {
  const { data: followers } = useGetFollowers(userId || '')

  const { data: followings } = useGetFollowings(userId || '')

  return (
    <div className='flex justify-between mt-3'>
      <p className='small-regular text-light-4'>
        Followers: {followers?.length}
      </p>
      <p className='small-regular text-light-4'>
        Following: {followings?.length}
      </p>
    </div>
  )
}

export default UserStats
