import { FC } from 'react'
import PostItem from '../features/posts/PostItem'
import { useGetPosts } from '../features/posts/hooks/useGetPosts'
import { useGetCurrentUser } from '../hooks/useGetCurrentUser'

interface SavedPostsProps {}

const SavedPosts: FC<SavedPostsProps> = () => {
  const { data: user } = useGetCurrentUser()

  const { posts } = useGetPosts()

  if (!posts || !user) {
    return null
  }

  const saves = posts.filter((post) => post.saves?.includes(user.id))

  return (
    <div className='flex flex-1'>
      <div className='home-container'>
        <div className='home-posts mb-28'>
          <h2 className='h3-bold md:h2-bold text-left w-full'>Saved posts</h2>
          {saves.length === 0 ? (
            <p className='text-left w-full'>There are no saved posts yet.</p>
          ) : (
            saves.map((post) => <PostItem post={post} key={post.id} />)
          )}
        </div>
      </div>
    </div>
  )
}

export default SavedPosts
