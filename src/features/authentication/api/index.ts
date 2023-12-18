import imageCompression from 'browser-image-compression'
import supabase, { supabaseUrl } from '../../../services/supabase'
import { IUser } from './../types/index'

export async function signup({
  full_name,
  username,
  email,
  password,
  avatarFile,
}: IUser & { avatarFile?: File }) {
  if (!avatarFile) {
    return null
  }

  const options = {
    maxSizeMB: 1,
    useWebWorker: true,
    alwaysKeepResolution: true,
    fileType: 'jpeg',
    initialQuality: 100,
    maxWidthOrHeight: 300,
  }

  const compressedFile = await imageCompression(avatarFile, options)

  const { data: avatarData, error: avatarError } = await supabase.storage
    .from('avatars')
    .upload(`${username}`, compressedFile)

  if (avatarError) {
    throw new Error(avatarError.message)
  }

  console.log(avatarData)

  const { data: signupData, error: signupError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: full_name || '',
        username: username,
        // https://wumtorhsfhtzbmpyltqs.supabase.co/storage/v1/object/public/avatars/zxczxczxczxc
        avatar_url:
          `${supabaseUrl}/storage/v1/object/public/avatars/${avatarData.path}` ||
          '',
      },
    },
  })

  if (signupError) {
    throw new Error(signupError.message)
  }

  const { data: userData, error: dbError } = await supabase
    .from('users')
    .upsert([
      {
        id: signupData.user?.id,
        email: signupData.user?.email,
        full_name: full_name,
        username: username,
        avatar_url:
          `${supabaseUrl}/storage/v1/object/public/avatars/${avatarData.path}` ||
          '',
      },
    ])

  if (dbError) {
    throw new Error(dbError.message)
  }

  return { signupData, signupError, userData, dbError }
}

export async function login({
  email,
  password,
}: {
  email: string
  password: string
}) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    throw new Error(error.message)
  }

  return data
}

export async function getCurrentUser() {
  const { data: sessionData, error: sessionError } =
    await supabase.auth.getSession()

  if (!sessionData.session) {
    return null
  }

  if (sessionError) {
    throw new Error(sessionError.message)
  }

  const { data: userData, error: userError } = await supabase.auth.getUser()

  if (!userData) {
    return null
  }

  if (userError) {
    throw new Error(userError.message)
  }

  return userData.user
}

export async function logout() {
  const { error } = await supabase.auth.signOut()

  if (error) {
    throw new Error(error.message)
  }
}

// export async function updateCurrentUser({
//   password,
//   fullName,
//   avatar,
// }: UpdateUserProps) {
//   let updateData = {}

//   if (password) updateData = { password }
//   if (fullName) updateData = { data: { fullName } }

//   const { data: userData, error: userError } = await supabase.auth.updateUser(
//     updateData
//   )

//   if (userError) {
//     throw new Error(userError.message)
//   }

//   if (!avatar) {
//     return userData.user
//   }

//   const avatarUrl = `avatar-${uuid()}`.replaceAll('/', '')

//   const { error: avatarError } = await supabase.storage
//     .from('avatars')
//     .upload(avatarUrl, avatar)

//   if (avatarError) {
//     throw new Error(avatarError.message)
//   }

//   const { data: updatedUserData, error: updatedUserError } =
//     await supabase.auth.updateUser({
//       data: {
//         avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${avatarUrl}`,
//       },
//     })

//   if (updatedUserError) {
//     throw new Error(updatedUserError.message)
//   }

//   return updatedUserData.user
// }
