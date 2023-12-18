import { PostgrestResponse } from '@supabase/supabase-js'
import supabase from '../../../services/supabase'
import { IUser } from '../../authentication/types'
import { IFollower } from '../types'

export async function getUsers() {
  const { data, error }: PostgrestResponse<IUser> = await supabase
    .from('users')
    .select('*')

  if (error) {
    console.log(error.message)
    throw new Error(error.message)
  }

  return data
}

export async function getUserFollowers(userId?: string) {
  const { data, error }: PostgrestResponse<IFollower> = await supabase
    .from('followers')
    .select('follower_id')
    .eq('following_id', userId)

  if (error) {
    console.log(error.message)
    throw new Error(error.message)
  }

  return data
}

export async function getUserFollowings(userId: string) {
  const { data, error }: PostgrestResponse<IFollower> = await supabase
    .from('followers')
    .select('following_id')
    .eq('follower_id', userId)

  if (error) {
    console.log(error.message)
    throw new Error(error.message)
  }

  return data
}

export async function addToFollows(followerId: string, followingId: string) {
  const { error } = await supabase
    .from('followers')
    .insert([{ follower_id: followerId, following_id: followingId }])
    .select()

  if (error) {
    console.log(error.message)
    throw new Error(error.message)
  }
}

export async function checkAndToggleSubscription(
  followerId: string,
  followingId: string
) {
  // Проверка, подписан ли уже пользователь
  const { data: existingRecord } = await supabase
    .from('followers')
    .select('follower_id, following_id')
    .eq('follower_id', followerId)
    .eq('following_id', followingId)
    .single()

  // Пользователь еще не подписан, подписываем
  if (!existingRecord) {
    const { error: insertError } = await supabase
      .from('followers')
      .insert([{ follower_id: followerId, following_id: followingId }])
      .select()

    if (insertError) {
      console.error(insertError.message)
    } else {
      console.log('Подписка оформлена')
    }
  }

  if (existingRecord) {
    // Пользователь уже подписан, отменяем подписку
    const { error: deleteError } = await supabase
      .from('followers')
      .delete()
      .eq('follower_id', followerId)
      .eq('following_id', followingId)

    if (deleteError) {
      console.error(deleteError.message)
    } else {
      console.log('Подписка отменена')
    }
  }
}
