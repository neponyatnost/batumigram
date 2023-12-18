import { clsx, type ClassValue } from 'clsx'
import { formatDistance, parseISO } from 'date-fns'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatDistanceFromNow = (dateStr: string) => {
  return formatDistance(parseISO(dateStr), new Date(), {
    addSuffix: true,
  }).replace('about ', '')
}

export function removeDuplicateStrings(arr: string[]) {
  const uniqueSet = new Set(arr)

  const uniqueArray = [...uniqueSet]

  return uniqueArray
}

export const checkIsLiked = (likeList: string[], userId: string) => {
  return likeList.includes(userId)
}
