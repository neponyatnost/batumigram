import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Toaster } from 'react-hot-toast'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AuthLayout from './features/authentication/AuthLayout'
import LoginForm from './features/authentication/LoginForm'
import SignUpForm from './features/authentication/SignUpForm'
import CreatePost from './features/posts/CreatePost'
import Home from './pages/Home'
import People from './pages/People'
import PostDetails from './pages/PostDetails'
import SavedPosts from './pages/SavedPosts'
import SearchPosts from './pages/SearchPosts'
import AppLayout from './ui/AppLayout'
import ProtectedRoute from './ui/ProtectedRoute'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
})

function App() {
  return (
    <main className='flex h-screen'>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} position='bottom' />
        <BrowserRouter>
          <Routes>
            <Route
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Home />} />
              <Route path='/create-post' element={<CreatePost />} />
              <Route path='/saved' element={<SavedPosts />} />
              <Route path='/posts/:postId' element={<PostDetails />} />
              <Route path='/all-users' element={<People />} />
              <Route path='/explore' element={<SearchPosts />} />
            </Route>
            <Route element={<AuthLayout />}>
              <Route path='/sign-up' element={<SignUpForm />} />
              <Route path='/sign-in' element={<LoginForm />} />
            </Route>
          </Routes>
        </BrowserRouter>
        <Toaster
          position='bottom-center'
          gutter={16}
          containerStyle={{ margin: '8px' }}
          toastOptions={{
            success: {
              duration: 3000,
            },
            error: {
              duration: 5000,
            },
            style: {
              fontSize: '16px',
              maxWidth: '400px',
              padding: '16px 24px',
              backgroundColor: '#fff',
              color: 'teal',
            },
          }}
        />
      </QueryClientProvider>
    </main>
  )
}

export default App
