import { FC } from 'react'
import { Link } from 'react-router-dom'
import PostStats from '../features/posts/PostStats'
import { useGetPostById } from '../features/posts/hooks/useGetPostById'
import { useGetCurrentUser } from '../hooks/useGetCurrentUser'
import { Button } from '../ui/Button'
import Spinner from '../ui/Spinner'
import { formatDistanceFromNow, removeDuplicateStrings } from '../utils'

interface PostDetailsProps {}

const PostDetails: FC<PostDetailsProps> = () => {
  const { data: post, isLoading } = useGetPostById()

  const { data: user } = useGetCurrentUser()

  if (!post || !user) {
    return null
  }

  if (isLoading) {
    return <Spinner />
  }

  const uniqueTags = removeDuplicateStrings(post.hashtags || [''])

  const handleDeletePost = () => {}

  return (
    <div className='post_details-container'>
      <h2 className='h3-bold md:h2-bold text-left w-full'>Post details</h2>
      <div className='post_details-card'>
        <img className='post_details-img' src={post.imageurl} alt='Post' />

        <div className='post_details-info'>
          <div className='flex-between w-full'>
            <div className='flex items-center gap-3'>
              <img
                src={
                  post.user?.avatar_url ||
                  '/assets/icons/profile-placeholder.svg'
                }
                alt='Post creator'
                className='rounded-full w-8 h-8 lg:w-12 lg:h-12'
              />
              <div className='flex flex-col'>
                <Link to={`/profile/${post.user?.username}`}>
                  <p className='base-medium lg:body-bold text-light-1 underline'>
                    {post.user?.full_name}
                  </p>
                </Link>
                <div className='flex items-center gap-2 text-light-4 flex-wrap'>
                  <p className='subtle-semibold lg:small-regular'>
                    {formatDistanceFromNow(post.created_at || '')}
                  </p>
                </div>
              </div>
            </div>
            <div className='flex-center gap-4'>
              <Link
                to={`/update-post/${post.id}`}
                className={`${user.id !== post.user?.id && 'hidden'}`}
              >
                <img
                  src='/assets/icons/edit.svg'
                  alt='Edit post'
                  width={24}
                  height={24}
                />
              </Link>
              <Button
                onClick={handleDeletePost}
                variant={'ghost'}
                className={`ghost_details-delete_btn ${
                  user.id !== post.user?.id && 'hidden'
                }`}
              >
                <img
                  src='/assets/icons/delete.svg'
                  alt='Delete post'
                  width={24}
                  height={24}
                />
              </Button>
            </div>
          </div>
          <hr className='border w-full border-light-4/80' />
          <div className='flex flex-col flex-1 w-full small-medium lg:base-regular'>
            <ul className='flex gap-1 mb-2 justify-start small-medium lg:base-medium'>
              {uniqueTags[0].length
                ? uniqueTags.map((tag: string) => (
                    <li key={tag} className='text-light-4 hover:underline'>
                      <Link to={`/search/tag=${tag}`}>
                        #{tag.toLowerCase()}
                      </Link>
                    </li>
                  ))
                : ''}
            </ul>
            <div className='small-medium lg:base-medium mb-5'>
              <p>{post.description}</p>
            </div>
          </div>
          <div className='w-full'>
            <PostStats post={post} userId={user.id} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostDetails
