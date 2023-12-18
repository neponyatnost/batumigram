import {
  PostgrestResponse,
  PostgrestSingleResponse,
} from '@supabase/supabase-js'
import supabase, { supabaseUrl } from '../../../services/supabase'
import { IPost } from '../types'

export async function getPosts() {
  const { data, error }: PostgrestResponse<IPost> = await supabase
    .from('posts')
    .select(
      `
          *,
          user:user_id(*)
        `
    )
    .order('created_at', { ascending: false })

  if (error) {
    console.log(error.message)
    throw new Error(error.message)
  }

  if (!data) {
    return null
  }

  return data
}

// export async function getSavedPosts(userId: string) {
//   const { data, error }: PostgrestResponse<ISavedPost> = await supabase
//     .from('savedposts')
//     .select('*')
//     .eq('user_id', userId)

//   if (error) {
//     console.log(error.message)
//     throw new Error(error.message)
//   }

//   if (!data) {
//     return null
//   }

//   const postIds = data.map((post) => post.post_id)

//   const { data: posts, error: postsError }: PostgrestResponse<IPost> =
//     await supabase.from('posts').select('*, user:user_id(*)').in('id', postIds)

//   if (postsError) {
//     console.log(postsError.message)
//     throw new Error(postsError.message)
//   }

//   return { posts }
// }

// export async function createOrEditPost(newPost: IPost, postId?: string) {
//   if (!supabaseUrl) {
//     return null
//   }

//   // const hasImagePath = newPost.imageurl.startsWith(supabaseUrl)

//   let query = postId
//     ? supabase
//         .from('posts')
//         .update({
//           ...newPost,
//           imageurl: newPost.imageurl,
//         })
//         .eq('id', postId)
//     : supabase.from('posts').insert([
//         {
//           ...newPost,
//           imageurl: newPost.imageurl,
//         },
//       ])

//   const {
//     data: newPostData,
//     error: newPostError,
//   }: PostgrestSingleResponse<IPost | null> = await query.select().single()

//   if (newPostError) {
//     console.log(newPostError.message)
//     throw new Error(newPostError.message)
//   }

//   const { error: storageError } = await supabase.storage
//     .from('posts')
//     .upload(newPost.imageurl, newPost.id)

//   if (storageError && newPostData) {
//     await supabase.from('posts').delete().eq('id', newPostData.id)
//     throw new Error('The image was not uploaded and post could not be created.')
//   }

//   return newPostData
// }

export async function createPost({
  user_id,
  description,
  image,
}: IPost & { image: File }) {
  if (!image) {
    throw new Error('Image is required.')
  }

  if (!supabaseUrl) {
    console.log('No supabase url')
  }

  const timestamp = new Date().getTime()
  const uniqueFileName = `file_${timestamp}_${image.name}`

  const { data: imageData, error: imageError } = await supabase.storage
    .from('posts')
    .upload(`${uniqueFileName}`, image)

  if (imageError) {
    throw new Error('Api image error ' + imageError.message)
  }

  const { data: postData, error: postError } = await supabase
    .from('posts')
    .insert([
      {
        user_id: user_id,
        description: description || '',
        imageurl: `${supabaseUrl}/storage/v1/object/public/posts/${imageData.path}`,
      },
    ])
    .select()
    .single()

  if (postError) {
    throw new Error('Не удалось создать пост :(')
  }

  return { postData, imageData }
}

export async function getPostById({ postId }: { postId?: string }) {
  const { data: post, error }: PostgrestSingleResponse<IPost | null> =
    await supabase
      .from('posts')
      .select('*, user:user_id(*)')
      .eq('id', postId)
      .single()

  if (error) {
    console.log(error.message)
    throw new Error(error.message)
  }

  if (!post) {
    console.log('Can not find post #', postId)
    return null
  }

  return post
}

export async function likePost({
  postId,
  userId,
}: {
  postId?: string
  userId?: string
}) {
  if (!postId || !userId) {
    return null
  }
  try {
    const { data: post, error: postError } = await supabase
      .from('posts')
      .select('likes')
      .eq('id', postId)
      .single()

    if (postError) {
      console.error(postError.message)
      throw new Error(postError.message)
    }

    const currentLikes: string[] = post.likes || []
    const likeIndex = currentLikes.indexOf(userId)

    if (likeIndex !== -1) {
      // Если пользователь уже лайкнул пост, удаляем лайк
      currentLikes.splice(likeIndex, 1)
    } else {
      // Если пользователь еще не лайкнул пост, добавляем лайк
      currentLikes.push(userId)
    }

    const { error: updateError } = await supabase
      .from('posts')
      .update({ likes: currentLikes })
      .eq('id', postId)
      .single()

    if (updateError) {
      console.error(updateError.message)
      throw new Error(updateError.message)
    }
  } catch (error) {
    console.error(error)
    throw new Error('Error updating likes')
  }
}

export async function savePost({
  postId,
  userId,
}: {
  postId?: string
  userId?: string
}) {
  if (!postId || !userId) {
    return null
  }

  try {
    const { data: post, error: postError } = await supabase
      .from('posts')
      .select('saves')
      .eq('id', postId)
      .single()

    if (postError) {
      console.error(postError.message)
      throw new Error(postError.message)
    }

    const currentSaves: string[] = post.saves || []
    const saveIndex = currentSaves.indexOf(userId)

    if (saveIndex !== -1) {
      currentSaves.splice(saveIndex, 1)
    } else {
      currentSaves.push(userId)
    }

    const { error: updateError } = await supabase
      .from('posts')
      .update({ saves: currentSaves })
      .eq('id', postId)
      .single()

    if (updateError) {
      console.error(updateError.message)
      throw new Error(updateError.message)
    }
  } catch (error) {
    console.error(error)
    throw new Error('Error updating saves')
  }
}
