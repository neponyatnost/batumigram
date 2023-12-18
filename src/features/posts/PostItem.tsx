import { FC } from 'react'
import { Link } from 'react-router-dom'
import { useGetCurrentUser } from '../../hooks/useGetCurrentUser'
import Spinner from '../../ui/Spinner'
import { formatDistanceFromNow, removeDuplicateStrings } from '../../utils'
import PostStats from './PostStats'
import { IPost } from './types'

interface PostItemProps {
  post: IPost
}

const PostItem: FC<PostItemProps> = ({ post }) => {
  const { data: user, isLoading } = useGetCurrentUser()

  if (!post) {
    return null
  }

  if (isLoading) {
    return <Spinner />
  }

  const uniqueTags = removeDuplicateStrings(post.hashtags || [''])

  return (
    <div className='post-card mb-5'>
      <div className='flex-between mb-5'>
        <div className='flex items-center gap-3'>
          <Link to={`/profile/${post.user.username ? post.user.username : ''}`}>
            <img
              src={
                post.user.avatar_url || '/assets/icons/profile-placeholder.svg'
              }
              alt='Post creator'
              className='block w-12 h-12 aspect-square object-cover object-center rounded-full outline-2 outline outline-gray-100'
            />
          </Link>
          <div className='flex flex-col'>
            <Link
              to={`/profile/${post.user.username ? post.user.username : ''}`}
            >
              <p className='base-medium lg:body-bold text-light-1'>
                @{post.user.username ? post.user.username : ''}
              </p>
            </Link>
            <div className='flex items-center gap-2 text-light-4 flex-wrap'>
              <p className='subtle-semibold lg:small-regular'>
                {formatDistanceFromNow(post.created_at || '')}
              </p>
            </div>
          </div>
        </div>
        <Link
          to={`/update-post/${post.id}`}
          className={`${user?.id !== post.user_id && 'hidden'}`}
        >
          <img
            src='/assets/icons/edit.svg'
            alt='Edit post'
            width={20}
            height={20}
          />
        </Link>
      </div>

      <Link to={`/posts/${post.id}`}>
        <img
          src={post.imageurl}
          alt={post.description}
          className='post-card_img'
        />
      </Link>
      {post.hashtags && (
        <ul className='flex gap-1 mb-2 justify-start small-medium lg:base-medium'>
          {uniqueTags[0].length
            ? uniqueTags.map((tag: string) => (
                <li key={tag} className='text-light-4 hover:underline'>
                  <Link to={`/search/tag=${tag}`}>#{tag.toLowerCase()}</Link>
                </li>
              ))
            : ''}
        </ul>
      )}
      <PostStats post={post} userId={user ? user.id : ''} />
      {post.description && (
        <div className='small-medium lg:base-medium mb-5'>
          <p>{post.description}</p>
        </div>
      )}
    </div>
  )
}

export default PostItem
