import { FC, useState } from 'react'
import SpinnerMini from '../../ui/SpinnerMini'
import { useLikePost } from './hooks/useLikePost'
import { useSavePost } from './hooks/useSavePost'
import { IPost } from './types'

interface PostStatsProps {
  post: IPost
  userId: string
}

const PostStats: FC<PostStatsProps> = ({ post, userId }) => {
  const { mutateAsync: likePost, isPending: isLikeLoading } = useLikePost(
    post.id,
    userId
  )
  const likesList = post.likes?.map((like) => like)
  const savesList = post.saves?.map((save) => save)

  const [likes, setLikes] = useState(likesList || [])

  const [saves, setSaves] = useState(savesList || [])

  const { mutate: savePost, isPending: isSaving } = useSavePost(post.id, userId)

  const isLiked = likes.indexOf(userId) !== -1
  const isSaved = saves.indexOf(userId) !== -1

  const handleLikePost = (e: React.MouseEvent) => {
    e.preventDefault()

    let newLikes = [...likes]

    if (isLiked) {
      newLikes = newLikes.filter((id) => id !== userId)
    } else {
      newLikes.push(userId)
    }

    setLikes(newLikes)
    likePost()
  }

  const handleSavePost = (e: React.MouseEvent) => {
    e.preventDefault()

    let newSaves = [...saves]

    if (isSaved) {
      newSaves = newSaves.filter((id) => id !== userId)
    } else {
      newSaves.push(userId)
    }

    setSaves(newSaves)
    savePost()
  }

  return (
    <div className='flex justify-between items-center z-20 mb-4 h-7'>
      <div className='flex gap-2 mr-5 items-center justify-center'>
        {isLikeLoading ? (
          <SpinnerMini />
        ) : (
          <>
            <img
              src={
                isLiked
                  ? '/assets/icons/liked-post.svg'
                  : '/assets/icons/like.svg'
              }
              alt='Like'
              width={25}
              height={25}
              className='cursor-pointer'
              onClick={handleLikePost}
            />
            <p className='small-medium lg:base-medium'>
              {post.likes?.length || 0}
            </p>
          </>
        )}
      </div>
      <div className='flex gap-2 items-center'>
        {isSaving ? (
          <SpinnerMini />
        ) : (
          <>
            <img
              src={
                isSaved ? '/assets/icons/saved.svg' : '/assets/icons/save.svg'
              }
              alt='Save'
              width={25}
              height={25}
              className='cursor-pointer'
              onClick={handleSavePost}
            />
            <p className='small-medium lg:base-medium'>
              {post.saves?.length || 0}
            </p>
          </>
        )}
      </div>
    </div>
  )
}

export default PostStats
