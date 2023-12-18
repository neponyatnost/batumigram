import { FC, useCallback, useState } from 'react'
import { FileWithPath, useDropzone } from 'react-dropzone'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useGetCurrentUser } from '../../hooks/useGetCurrentUser'
import { Button } from '../../ui/Button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../ui/Form'
import { Input } from '../../ui/Input'
import SpinnerMini from '../../ui/SpinnerMini'
import { Textarea } from '../../ui/Textarea'
import { useCreatePost } from './hooks/useCreatePost'
import { IPost } from './types'

interface PostFormProps {
  post?: IPost
  action?: 'update' | 'create'
}

const PostForm: FC<PostFormProps> = ({ post, action }) => {
  const { mutate: create, isPending: isCreating } = useCreatePost()

  const [postImage, setPostImage] = useState<File[]>([])

  const [fileUrl, setFileUrl] = useState('')

  const { data: user } = useGetCurrentUser()

  const navigate = useNavigate()

  const form = useForm<IPost>()

  const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
    setPostImage(acceptedFiles)
    // fieldChange(acceptedFiles)
    setFileUrl(URL.createObjectURL(acceptedFiles[0]))
  }, [])

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.svg'],
    },
  })

  if (!user) {
    return null
  }

  const onSubmit = (values: IPost) => {
    // if (post && action === 'update') {
    //   const updatedPost = updatePost({
    //     ...values,
    //     postId: post.$id,
    //     imageId: post?.imageId,
    //     imageUrl: post?.imageUrl,
    //   })

    // if (!updatedPost) {
    //   return toast.error('There is no updated post. Please try again.')
    // }

    //   return navigate(`/posts/${post.$id}`)
    // }

    if (!postImage) {
      return null
    }

    create(
      {
        ...values,
        user_id: user.id,
        image: postImage[0],
      },
      {
        onSuccess: () => {
          navigate('/')
        },
      }
    )
  }

  // const handlePostImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const files = e.target.files
  //   if (files && files.length > 0) {
  //     setPostImage(files[0])
  //     setFileUrl(URL.createObjectURL(files[0]))
  //   }
  // }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex flex-col gap-9 w-full max-w-5xl'
      >
        <FormField
          control={form.control}
          name='description'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='shad-form_label'>Description*</FormLabel>
              <FormControl>
                <Textarea
                  placeholder='Description for your photo...'
                  className='shad-textarea' // custom-scrollbar
                  {...field}
                />
              </FormControl>
              <FormMessage className='shad-form_message' />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='imageurl'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='shad-form_label' htmlFor='imageurl'>
                Add photo*
              </FormLabel>
              <FormControl className='flex flex-1 justify-center w-full p-5 lg:p-10'>
                <div
                  {...getRootProps()}
                  className='flex flex-col flex-center bg-dark-3 rounded-xl cursor-pointer'
                >
                  <input {...getInputProps()} className='cursor-pointer' />
                  {fileUrl ? (
                    <>
                      <div className='flex flex-1 justify-center w-full p-5 lg:p-10'>
                        <img
                          src={fileUrl}
                          alt='Uploaded preview'
                          className='file_uploader-img'
                        />
                      </div>
                      <p className='file_uploader-label'>
                        Click or drag new photo to replace
                      </p>
                    </>
                  ) : (
                    <div className='file_uploader-box'>
                      <img
                        src='/assets/icons/file-upload.svg'
                        alt='File upload'
                        width={96}
                        height={77}
                      />
                      <h3 className='base-medium text-light-2 mb-2 mt-6'>
                        Drag photo here
                      </h3>
                      <p className='text-light-4 small-regular mb-6'>
                        JPG, GIF, PNG, SVG
                      </p>
                      <Button className='shad-button_dark_4'>
                        Select from storage
                      </Button>
                    </div>
                  )}
                </div>
              </FormControl>
              <FormMessage className='shad-form_message' />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='hashtags'
          defaultValue={['']}
          render={({ field }) => (
            <FormItem>
              <FormLabel className='shad-form_label'>
                Add tags (separated by comma " , ")
              </FormLabel>
              <FormControl>
                <Input
                  className='shad-input'
                  type='text'
                  placeholder='sea, mountains, food, etc...'
                  id='hashtags'
                  {...field}
                />
              </FormControl>
              <FormMessage className='shad-form_message' />
            </FormItem>
          )}
        />
        <div className='flex gap-4 items-center justify-end'>
          <Button
            type='button'
            className='shad-button_dark_4'
            disabled={isCreating}
          >
            Cancel
          </Button>
          <Button
            disabled={isCreating}
            type='submit'
            className='shad-button_primary whitespace-nowrap'
          >
            {isCreating && <SpinnerMini />}
            {action === 'update' ? 'Update Post' : 'Create Post'}
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default PostForm
