import { FC } from 'react'
import { Link } from 'react-router-dom'
import PostItem from '../features/posts/PostItem'
import { useGetPosts } from '../features/posts/hooks/useGetPosts'
import Spinner from '../ui/Spinner'

interface HomeProps {}

const Home: FC<HomeProps> = () => {
  const { posts, isLoading, error } = useGetPosts()

  if (!posts) {
    return null
  }

  if (isLoading) {
    return <Spinner />
  }

  if (error) {
    return <h1>Error: {error.message}</h1>
  }

  return (
    <div className='flex flex-1'>
      <div className='home-container'>
        <h2 className='h3-bold md:h2-bold text-left w-full'>Feed</h2>
        <div className='home-posts mb-28'>
          <ul className='flex flex-col flex-1 gap-9 w-full'>
            {!posts.length && (
              <h2>
                There is no posts yet.{' '}
                <Link className='text-teal-600 underline' to='/create-post'>
                  Create!
                </Link>
              </h2>
            )}

            {posts &&
              posts.map((post) => <PostItem post={post} key={post.id} />)}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Home
