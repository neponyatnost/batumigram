import { FC } from 'react'
import { SlUserFollow } from 'react-icons/sl'
import SpinnerMini from '../../ui/SpinnerMini'
import { useAddToFollows } from './hooks/useAddToFollows'

interface AddToFollowsProps {
  followerId: string
  followingId: string
}

const AddToFollows: FC<AddToFollowsProps> = ({ followerId, followingId }) => {
  const {
    mutate: addToFollows,
    error,
    isPending,
  } = useAddToFollows(followerId, followingId)

  if (error) {
    return (
      <h2 className='h3-bold md:h2-bold text-left w-full'>{error.message}</h2>
    )
  }

  const handleFollow = (e: React.MouseEvent) => {
    e.preventDefault()
    addToFollows()
  }

  return (
    <>
      {isPending ? (
        <SpinnerMini />
      ) : (
        <button
          onClick={handleFollow}
          className='outline outline-teal-600 outline-1 rounded-[10px] p-2 active:bg-teal-200 transition-all'
        >
          <SlUserFollow size={24} fill='teal' />
        </button>
      )}
    </>
  )
}

export default AddToFollows
