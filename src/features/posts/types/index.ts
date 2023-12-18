import { IUser } from '../../authentication/types'

export interface IPost {
  id?: string
  created_at?: string
  user_id: string
  description?: string
  imageurl: string
  hashtags?: string[]
  commentscount?: number
  likescount?: number
  user: IUser
  likes?: string[]
  saves?: string[]
}

export interface ISavedPost {
  id: string
  created_at: string
  post_id: string
  user_id: string
}

export interface ILikedPost {
  id: string
  created_at: string
  post_id: string
  user_id: string
}
