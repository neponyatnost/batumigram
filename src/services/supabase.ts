import { createClient } from '@supabase/supabase-js'

export const storageAvatarsUrl =
  'https://wumtorhsfhtzbmpyltqs.supabase.co/storage/v1/object/public/avatars/'
export const supabaseUrl = process.env.REACT_APP_API_URL
const supabaseKey = process.env.REACT_APP_API_KEY

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Supabase key or Supabase url is not defined')
}

const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase
